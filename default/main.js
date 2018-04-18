// Misc
var params              = require('parameters');
var util                = require('utils');

// Roles
var roleHarvester       = require('role.harvester');
var roleUpgrader        = require('role.upgrader');
var roleBuilder         = require('role.builder');
var roleWallRepairer    = require('role.wallRepairer');
var roleRepairer        = require('role.repairer');

//Prototypes
var protoTower          = require('prototype.tower');
var protoSpawn          = require('prototype.spawn');


module.exports.loop = function () {
    const OUTPUT_LOGS   = true;

    let prefix          = 'role';
    let informations    = {'rooms': []};
    let before          = 0.00;
    let after           = 0.00;


    before = Game.cpu.getUsed();

    for (let name in Game.rooms) {
        if (name == 'E55N56') { // Workaround to ignore losted creeps...
            Game.notify('A creep ran away to room ' + name, 180);
            continue;
        }
        let room = Game.rooms[name];
        let creeps = room.find(FIND_MY_CREEPS);

        // Sorting by role
        creeps.sort((a,b) => a.memory.role.localeCompare(b.memory.role));

        let info = {
            'name': name,
            'energy': room.energyAvailable.toFixed(2),
            'energyMax': room.energyCapacityAvailable.toFixed(2),
            'totalCreeps': creeps.length,
            'roles': {}
        };

        protoTower.run(room);

        for (let creep of creeps) {
            for (let role of params.roles) {
                if (role == creep.memory.role) {
                    if (info.roles[role] == undefined) {
                        info.roles[role] = 1;
                    } else {
                        info.roles[role] += 1;
                    }
                    let runner = prefix.concat(role.charAt(0).toUpperCase().concat(role.slice(1)));
                    let run = runner.concat('.run(creep)');
                    eval(run);
                }
            }
        }

        informations.rooms.push(info);
    }

    protoSpawn.spawnner(informations.rooms);

    // Sometimes, uncomment this line to clean memory
    // util.clearMemory(true);

    after = Game.cpu.getUsed();

    if(OUTPUT_LOGS){
        console.log('CPU Usage      : Before -> ' + before.toFixed(2), '- After -> ' + after.toFixed(2));
        for(let info of informations.rooms){
            console.log('Room           : ' + info.name);
            console.log('Energy         : ' + info.energy);
            console.log('EnergyMax      : ' + info.energyMax);
            console.log('Total Creeps   : ' + info.totalCreeps);
            console.log('Creeps         : ' + JSON.stringify(info.roles));
            console.log('--------------------------------------------');
        }
    }
}
