var prototypeCreep  = require('prototype.creep');

var roleBuilder = {

    /**
     * Routine of one Builder
     *
     * @param {Creep} creep
     *
     * @return void
     */
    run: function(creep) {
        let sourceKey       = 0;
        let constructions   = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
        let sources         = creep.room.find(FIND_SOURCES);
        let harvest         = (creep.memory.building && creep.carry.energy == 0);
        let build           = (!creep.memory.building && creep.carry.energy == creep.carryCapacity);

        if (build) {
            creep.memory.building = true;
        }
        if (harvest) {
            creep.memory.building = false;
        }

        if (creep.memory.building) {
            if (constructions) {
                prototypeCreep.creepBuild(creep, constructions);
            } else {
                Game.notify('All constructions were built, builders are idle!', 180);
            }
        } else {
            prototypeCreep.creepHarvest(creep, sources[sourceKey]);
        }
    }
};

module.exports = roleBuilder;
