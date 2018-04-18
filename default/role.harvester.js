var prototypeCreep  = require('prototype.creep');

var roleHarvester = {

    /**
     * Routine of one Harvester
     *
     * @param {Creep} creep
     *
     * @return void
     */
    run: function(creep) {
        let sourceKey   = (!isNaN(creep.memory.source_target) && creep.memory.source_target != null  ? creep.memory.source_target : 1);
        let harvest     = creep.carry.energy < creep.carryCapacity;
        let sources     = creep.room.find(FIND_SOURCES);

        // Prevent access to a source that not exist...
        if (sources.length == 1) {
            sourceKey = 0;
        }

        let containers  = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (container) => {
                return(
                    container.structureType == STRUCTURE_CONTAINER &&
                    container.store[RESOURCE_ENERGY] < container.storeCapacity
                )
            }
        });
        let structures  = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (
                    structure.structureType == STRUCTURE_EXTENSION
                    || structure.structureType == STRUCTURE_SPAWN
                ) && structure.energy < structure.energyCapacity
            }
        });
        let towers      = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (
                    structure.structureType == STRUCTURE_TOWER
                ) && structure.energy < structure.energyCapacity
            }
        });

        if (harvest) {
            prototypeCreep.creepHarvest(creep, sources[sourceKey]);
        } else {
            if (creep.memory.provider == 1 && towers) {
                prototypeCreep.creepTransfer(creep, towers, RESOURCE_ENERGY);
            } else {
                if (structures) {
                    prototypeCreep.creepTransfer(creep, structures, RESOURCE_ENERGY);
                } else if (containers) {
                    prototypeCreep.creepTransfer(creep, containers, RESOURCE_ENERGY);
                }
            }
        }
    }
};

module.exports = roleHarvester;
