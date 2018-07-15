// Globals
global.params           = require('parameters');
global.prototypeCreep   = require('prototype.creep');

// Misc
let util        = require('utils');
let separator   = '----------------------------------------------------------------------------------------------------';
let title       = 'GLOBAL INFO';
let sepLength   = ((separator.length - title.length) / 2);
let first       = separator.substr(0, sepLength);
let last        = separator.substr(1 - sepLength);

//Prototypes
let protoTower  = require('prototype.tower');
let protoSpawn  = require('prototype.spawn');

// Roles
let roles = {
    'harvester':    require('role.harvester'),
    'upgrader':     require('role.upgrader'),
    'builder':      require('role.builder'),
    'wallRepairer': require('role.wallRepairer'),
    'repairer':     require('role.repairer'),
    'claimer':      require('role.claimer'),
};

module.exports.loop = function () {
    const OUTPUT_LOGS               = true;
    const OUTPUT_ONLY_USAGE         = true;
    const CALL_SPAWNNER_INTERVAL    = 50;
    const CALL_CLEAR_INTERVAL       = 3000;

    let before          = Game.cpu.getUsed();
    let informations    = {'rooms': []};
    let callingSpawnner = 'NO';
    let callingClear    = 'NO';

    /**
     * STEPS TO FOLLOW IF YOU WANT TO CONQUER AN ROOM
     *
     * Before of all, run this to create a claimer...
     * Game.spawns['SPAWN'].createCreep([CLAIM, WORK, CARRY, MOVE], undefined, {'role': 'claimer', 'target': 'ROOM_TARGET'})
     *
     * ...and uncomment the code bellow...
     *
     * util.getCreepsByRole('claimer').forEach(function (creep) {
     *     roles.claimer.run(creep);
     * });
     *
     * And wait until this creep conquer the room, after...
     * Follow these steps...
     *
     * 1 -  Uncomment the code bellow;
     * 2 -  Wait until the spawn has been created;
     * 3 -  Comment this again;
     * 4 -  Register the room on parameters.
     *
     * OBS.:
     *     The second parameter of the call bellow, is the spawn that
     *     will help the newly conquered room!
     *
     * util.controlNewRoom('E52N57', 'Spawn');
     */

    for (let name in Game.rooms) {
        if (params.spawns[name] === undefined) {
            continue;
        }

        let room = Game.rooms[name];
        let creeps = room.find(FIND_MY_CREEPS, {
            filter: (creep) => {
                return creep.memory.role !== 'claimer';
            }
        });

        // Sorting by role...
        creeps.sort((a, b) => a.memory.role.localeCompare(b.memory.role));

        let info = {
            'name': name,
            'energy': room.energyAvailable.toFixed(2),
            'energyMax': room.energyCapacityAvailable.toFixed(2),
            'level': room.controller.level.toFixed(2),
            'totalCreeps': creeps.length,
            'roles': {}
        };

        protoTower.run(room);

        for (let creep of creeps) {
            roles[creep.memory.role].run(creep);
            if (info.roles[creep.memory.role] === undefined) {
                info.roles[creep.memory.role] = 1;
            } else {
                info.roles[creep.memory.role] += 1;
            }
        }
        informations.rooms.push(info);
    }

    if (Game.time % CALL_SPAWNNER_INTERVAL === 0) {
        callingSpawnner = 'YES';
        protoSpawn.spawnner(informations.rooms);
    }

    if (Game.time % CALL_CLEAR_INTERVAL === 0) {
        callingClear = 'YES';
        util.clearMemory();
    }

    let after = Game.cpu.getUsed();

    if (OUTPUT_LOGS) {
        console.log(first, title, last);
        console.log(
            'CPU Usage      :',
            'Before ->',    before.toFixed(2),
            '- After ->',   after.toFixed(2)
        );
        console.log(
            'Calls          :',
            'clearMemory ->',   callingClear,
            '- spawnner ->',    callingSpawnner
        );
        console.log(separator);
        if (!OUTPUT_ONLY_USAGE) {
            for (let info of informations.rooms) {
                console.log(
                    'Room           :',
                    'Name:',        info.name,
                    '- Energy:',    info.energy.padStart(7, "0"),
                    '- EnergyMax:', info.energyMax.padStart(7, "0"),
                    '- Residents:', info.totalCreeps.toString().padStart(2, "0"),
                    '- Level:',     info.level
                );
                console.log('Creeps         :', JSON.stringify(info.roles));
                console.log(separator);
            }
        }
    }
};
