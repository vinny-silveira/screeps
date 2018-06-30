// Misc
let params  = require('parameters');
let util    = require('utils');

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
};

// Contants
const OUTPUT_LOGS       = false;
const OUTPUT_ONLY_USAGE = false;

module.exports.loop = function () {
    let informations = {'rooms': []};
    let before = Game.cpu.getUsed();

    for (let name in Game.rooms) {
        if (params.spawns[name] === undefined) {
            continue;
        }
        let room = Game.rooms[name];
        let creeps = room.find(FIND_MY_CREEPS);

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

    protoSpawn.spawnner(informations.rooms);

    // Sometimes, uncomment this line to clean memory
    // util.clearMemory(true);

    let after = Game.cpu.getUsed();

    if (OUTPUT_ONLY_USAGE && !OUTPUT_LOGS) {
        console.log('CPU Usage: Before ->', before.toFixed(2), '- After ->', after.toFixed(2));
    }

    if (OUTPUT_LOGS) {
        console.log('CPU Usage      : Before -> ' + before.toFixed(2), '- After -> ' + after.toFixed(2));
        for (let info of informations.rooms) {
            console.log('Room           :', info.name);
            console.log('Energy         :', info.energy);
            console.log('EnergyMax      :', info.energyMax);
            console.log('Total Creeps   :', info.totalCreeps);
            console.log('Creeps         :', JSON.stringify(info.roles));
            console.log('--------------------------------------------');
        }
    }
};
