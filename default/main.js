// Globals
global.params           = require('parameters');
global.prototypeCreep   = require('prototype.creep');

// Misc
let util = require('utils');

//Prototypes
let protoTower = require('prototype.tower');
let protoSpawn = require('prototype.spawn');

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
    const OUTPUT_LOGS               = false;
    const OUTPUT_ONLY_USAGE         = false;
    const CALL_SPAWNNER_INTERVAL    = 50;
    const CALL_CLEAR_INTERVAL       = 3000;

    let before          = Game.cpu.getUsed();
    let informations    = {'rooms': []};
    let callingSpawnner = 'NO';
    let callingClear    = 'NO';

    /**
     * 1 -  Uncomment the code bellow  if you have a newly conquered room;
     * 2 -  Wait until your spawn has created;
     * 3 -  Comment this again;
     * 4 -  Register the room on parameters.
     *
     * OBS.:
     *     The second parameter of call bellow, is the spawn that
     *     will help the newly room!
     *
     * util.controlNewRoom('E53N57', 'Home');
     * util.getCreepsByRole('claimer').forEach(function (creep) {
     *   roles.claimer.run(creep);
     * });
     */

    for (let name in Game.rooms) {
        if (params.spawns[name] === undefined) {
            continue;
        }

        let room    = Game.rooms[name];
        let creeps  = room.find(FIND_MY_CREEPS);

        // Sorting by role...
        creeps.sort((a, b) => a.memory.role.localeCompare(b.memory.role));

        let info = {
            'name': name,
            'energy': room.energyAvailable.toFixed(2),
            'energyMax': room.energyCapacityAvailable.toFixed(2),
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
        console.log('--------------------------------------GLOBAL INFO---------------------------------------');
        console.log(
            'CPU Usage      :',
            'Before ->', before.toFixed(2),
            '- After ->', after.toFixed(2)
        );
        console.log(
            'Calls          :',
            'clearMemory ->', callingClear,
            '- spawnner ->', callingSpawnner
        );
        console.log('----------------------------------------------------------------------------------------');
        if (!OUTPUT_ONLY_USAGE) {
            for (let info of informations.rooms) {
                console.log(
                    'Room           :',
                    'Name:', info.name,
                    '- Energy:', info.energy,
                    '- EnergyMax:', info.energyMax,
                    '- Residents:', info.totalCreeps
                );
                console.log('Creeps         :', JSON.stringify(info.roles));
                console.log('----------------------------------------------------------------------------------------');
            }
        }
    }
};
