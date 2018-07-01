let roleBuilder = {

    /**
     * Routine of one Builder
     *
     * @param {Creep} creep
     *
     * @return void
     */
    run: function (creep) {
        let sourceKey       = params.defaultSource.builder;
        let constructions   = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
        let sources         = creep.room.find(FIND_SOURCES);
        let harvest         = (creep.memory.building && creep.carry.energy === 0);
        let build           = (!creep.memory.building && creep.carry.energy === creep.carryCapacity);

        // Prevent access to a source that not exist...
        if (sources.length === 1) {
            sourceKey = 0;
        }

        if (build) {
            creep.memory.building = true;
        }
        if (harvest) {
            creep.memory.building = false;
        }

        if (creep.memory.building) {
            if (constructions) {
                prototypeCreep.creepBuild(creep, constructions);
            }
        } else {
            prototypeCreep.creepHarvest(creep, sources[sourceKey]);
        }
    }
};

module.exports = roleBuilder;
