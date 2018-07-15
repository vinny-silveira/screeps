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
        let parking         = creep.room.find(FIND_FLAGS);

        let harvest = (creep.memory.building && creep.carry.energy === 0);
        let build   = (!creep.memory.building && creep.carry.energy === creep.carryCapacity);
        let park    = (creep.carry.energy <= creep.carryCapacity && constructions === null);

        // Prevent access to a source that not exist...
        if (sources.length === 1) {
            sourceKey = 0;
        }

        if (build && constructions !== null) {
            creep.memory.building = true;
        }

        if (harvest || park) {
            creep.memory.building = false;
        }

        if (creep.memory.building) {
            prototypeCreep.creepBuild(creep, constructions);
        } else if (creep.carry.energy < creep.carryCapacity) {
            prototypeCreep.creepHarvest(creep, sources[sourceKey]);
        } else if (parking.length) {
            prototypeCreep.creepMove(creep, parking[0]);
        }
    }
};

module.exports = roleBuilder;
