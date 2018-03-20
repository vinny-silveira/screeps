var prototypeCreep = require('prototype.creep');

var roleUpgrader = {

    /**
     * Routine of one Upgrader
     *
     * @param {Creep}                   creep
     * @param {StructureController}     controller
     *
     * @return void
     */
    run: function(creep, controller) {
        let sourceKey   = 0;
        let sources     = creep.room.find(FIND_SOURCES);
        let harvest     = creep.memory.upgrading && creep.carry.energy == 0;
        let upgrade     = !creep.memory.upgrading && creep.carry.energy == creep.carryCapacity;

        if (harvest) {
            creep.memory.upgrading = false;
        }
        if (upgrade) {
            creep.memory.upgrading = true;
        }

        if (creep.memory.upgrading) {
            prototypeCreep.creepUpgrade(creep, controller);
        } else {
            prototypeCreep.creepHarvest(creep, sources[sourceKey]);
        }
    }
};

module.exports = roleUpgrader;
