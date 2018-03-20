var prototypeCreep = require('prototype.creep');

var roleHarvester = {

    /**
     * Routine of one Harvester
     *
     * @param {Creep} creep
     *
     * @return void
     */
    run: function(creep) {
        let sourceKey   = 1;
        let harvest     = creep.carry.energy < creep.carryCapacity;
        let sources     = creep.room.find(FIND_SOURCES);
        let containers  = creep.room.find(FIND_STRUCTURES, {
            filter: (container) => {
                return(
                    container.structureType == STRUCTURE_CONTAINER &&
                    container.store[RESOURCE_ENERGY] < container.storeCapacity
                );
            }
        });
        let structures  = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (
                    structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER
                ) && structure.energy < structure.energyCapacity;
            }
        });

        if (harvest) {
            prototypeCreep.creepHarvest(creep, sources[sourceKey]);
        } else {
            if (structures.length) {
                prototypeCreep.creepTransfer(creep, structures[0], RESOURCE_ENERGY);
            } else if (containers.length) {
                prototypeCreep.creepTransfer(creep, containers[0], RESOURCE_ENERGY);
            } else {
                prototypeCreep.creepMove(creep, sources[0]);
            }
        }
    }
};

module.exports = roleHarvester;
