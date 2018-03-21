var roleBuilder     = require('role.builder');
var prototypeCreep  = require('prototype.creep');

module.exports = {

    /**
     * Routine of one Repairer
     *
     * @param {Creep} creep
     *
     * @return void
     */
    run: function(creep) {
        let sourceKey       = 0;
        let sources         = creep.room.find(FIND_SOURCES);
        let notWork         = creep.memory.working && creep.carry.energy == 0;
        let work            = !creep.memory.working && creep.carry.energy == creep.carryCapacity;

        if (notWork) {
            creep.memory.working = false;
        } else if (work) {
            creep.memory.working = true;
        }

        if (creep.memory.working == true) {
            var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.hits < s.hitsMax && (
                    s.structureType != STRUCTURE_WALL &&
                    s.structureType != STRUCTURE_EXTENSION
                )
            });

            if (structure != undefined) {
                prototypeCreep.creepRepair(creep, structure);
            } else {
                roleBuilder.run(creep);
            }
        } else {
            prototypeCreep.creepHarvest(creep, sources[sourceKey]);
        }
    }
};
