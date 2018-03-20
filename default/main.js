var roleHarvester       = require('role.harvester');
var roleUpgrader        = require('role.upgrader');
var roleBuilder         = require('role.builder');
var roleWallRepairer    = require('role.wallRepairer');

var util                = require('utils');
var params              = require('parameters');

module.exports.loop = function () {
    const OUTPUT_LOGS       = true;

    let harvesterCount      = 0;
    let builderCount        = 0;
    let upgraderCount       = 0;
    let wallRepairerCount   = 0;

    let mySpawn             = params.getSpawn('s1');
    let myRoom              = params.getRoom('r1');
    let roomEnergy          = myRoom.energyAvailable.toFixed(2);
    let roomEnergyMax       = myRoom.energyCapacityAvailable.toFixed(2);

    let constructions       = myRoom.find(FIND_CONSTRUCTION_SITES);
    let walls               = myRoom.find(FIND_STRUCTURES, {
        filter: (s) => (s.structureType == STRUCTURE_WALL && s.hits <= 3000)
    }).sort((a,b) => a.hits - b.hits);

    for(let name in Game.creeps) {
        let creep = Game.creeps[name];

        if(creep.memory.role == 'harvester') {
            harvesterCount++;
            roleHarvester.run(creep);
        }

        if(creep.memory.role == 'upgrader') {
            upgraderCount++;
            roleUpgrader.run(creep, myRoom.controller);
        }

        if(creep.memory.role == 'builder') {
            builderCount++;
            roleBuilder.run(creep);
        }

        if(creep.memory.role == 'wallRepairer') {
            wallRepairerCount++;
            roleWallRepairer.run(creep);
        }
    }

    if (roomEnergy >= 200) {
        let createSmallCreep = '';
        if (harvesterCount < 1){
            createSmallCreep = 'harvester';
        }
        if (mySpawn.room.controller.ticksToDowngrade < 300){
            createSmallCreep = 'upgrader';
        }
        if (createSmallCreep.length > 0){
            mySpawn.createCreep(params.getBody('normal'), undefined, {role: createSmallCreep});
        }
    }

    if (roomEnergy == roomEnergyMax) {
        let createGreatCreep = '';
        if (harvesterCount < 2) {
            createGreatCreep = 'harvester';
        } else if (builderCount < 2 && constructions.length) {
            createGreatCreep = 'builder';
        } else if(wallRepairerCount < 2 && walls.length){
            createGreatCreep = 'wallRepairer';
        } else {
            createGreatCreep = 'upgrader';
        }
        mySpawn.createCreep(params.getBody('cool'), undefined, {role: createGreatCreep});
    }

    util.clearMemory();

    if(OUTPUT_LOGS){
        console.log('Room Capacity: '+roomEnergyMax);
        console.log('Room Energy:   '+roomEnergy);
        console.log('Harvester:     '+harvesterCount);
        console.log('Wall Repairer: '+wallRepairerCount);
        console.log('Builder:       '+builderCount);
        console.log('Upgrader:      '+upgraderCount);
        console.log('------------------------------');
    }
}
