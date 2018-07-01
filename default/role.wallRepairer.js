let roleBuilder = require('role.builder');

let roleWallRepairer = {

    /**
     * Routine of one Wall Repairer
     *
     * @param {Creep} creep
     *
     * @return void
     */
    run: function (creep) {
        let working     = !creep.memory.working && creep.carry.energy === creep.carryCapacity;
        let notWorking  = creep.memory.working && creep.carry.energy === 0;
        let sources     = creep.pos.findClosestByRange(FIND_SOURCES);

        let walls = creep.room.find(FIND_STRUCTURES, {
            filter: (s) => (s.structureType === STRUCTURE_WALL && s.hits <= 3000)
        }).sort((a, b) => a.hits - b.hits);

        if (notWorking) {
            creep.memory.working = false;
        }
        if (working) {
            creep.memory.working = true;
        }

        if (creep.memory.working) {
            if (walls.length) {
                prototypeCreep.creepRepair(creep, walls[0]);
            } else {
                roleBuilder.run(creep);
            }
        } else {
            prototypeCreep.creepHarvest(creep, sources);
        }
    }
};

module.exports = roleWallRepairer;
