let roleBuilder = require('role.builder');

let roleRepairer = {

    /**
     * Routine of one Repairer
     *
     * @param {Creep} creep
     *
     * @return void
     */
    run: function (creep) {
        let notWork = (creep.memory.working && creep.carry.energy === 0);
        let work    = (!creep.memory.working && creep.carry.energy === creep.carryCapacity);
        let sources = creep.pos.findClosestByRange(FIND_SOURCES);

        let structure = creep.room.find(FIND_STRUCTURES, {
            filter: (s) => s.hits < s.hitsMax && (
                s.structureType !== STRUCTURE_WALL &&
                s.structureType !== STRUCTURE_EXTENSION
            )
        }).sort((a, b) => a.hits - b.hits);

        if (notWork) {
            creep.memory.working = false;
        } else if (work) {
            creep.memory.working = true;
        }

        if (creep.memory.working === true) {
            if (structure.length) {
                prototypeCreep.creepRepair(creep, structure[0]);
            } else {
                roleBuilder.run(creep);
            }
        } else {
            prototypeCreep.creepHarvest(creep, sources);
        }
    }
};

module.exports = roleRepairer;
