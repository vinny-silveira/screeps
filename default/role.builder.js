var prototypeCreep  = require('prototype.creep');
var params          = require('parameters');

var roleBuilder = {

    /**
     * Routine of one Builder
     *
     * @param {Creep} creep
     *
     * @return void
     */
    run: function(creep) {
        let sourceKey       = 1;
        let constructions   = creep.room.find(FIND_CONSTRUCTION_SITES);
        let sources         = creep.room.find(FIND_SOURCES);
        let harvest         = creep.memory.building && creep.carry.energy == 0;
        let build           = !creep.memory.building && creep.carry.energy == creep.carryCapacity;

        if (harvest) {
            creep.memory.building = false;
        }
        if (build) {
            creep.memory.building = true;
        }

        if (creep.memory.building) {
            if (constructions.length) {
                prototypeCreep.creepBuild(creep, constructions[0]);
            } else {
                prototypeCreep.creepMove(creep, params.getSpawn());
                Game.notify('All constructions were built, builders are idle!', 180);
            }
        } else {
            prototypeCreep.creepHarvest(creep, sources[sourceKey]);
        }
    }
};

module.exports = roleBuilder;
