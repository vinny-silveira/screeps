var prototypeCreep = require('prototype.creep');

var roleUpgrader = {

    /**
     * Routine of one Upgrader
     *
     * @param {Creep} creep
     *
     * @return void
     */
    run: function(creep) {
        let signText    = "Good programmers write code that humans can understand.";
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
            prototypeCreep.creepUpgrade(creep, creep.room.controller);
        } else {
            prototypeCreep.creepHarvest(creep, sources[sourceKey]);
        }

        if (creep.room.controller.sign == undefined || creep.room.controller.sign.text != signText) {
            prototypeCreep.creepSign(creep, creep.room.controller, signText);
        }
    }
};

module.exports = roleUpgrader;
