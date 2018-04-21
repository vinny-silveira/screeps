var params      = require('parameters');
var protoRoom   = require('prototype.room');

var prototypeSpawn = {

    /**
     * Diff
     *
     * @param {Array}   array
     * @param {Number}  value
     * @param {Mixed}   key
     *
     * @return {Boolean}
     */
    diff: function(array, value, key){
        return (array[key] < value || array[key] == undefined);
    },

    /**
     * Spawn creeps...
     *
     * @param {Array} creeps
     *
     * @return void
     */
    spawnner: function(creeps) {
        for (info of creeps) {
            let myRoom  = params.getRoom(info.name);
            let spawn   = params.getSpawnFromRoom(info.name);

            protoRoom.setRoom(myRoom);

            if (info.energy >= 200) {
                let createSmallCreep = '';
                let createHarvester     = this.diff(info.roles, 1, 'harvester');
                let createRepairer      = this.diff(info.roles, 1, 'repairer') && protoRoom.countStructures();
                let createBuilder       = this.diff(info.roles, 1, 'builder') && protoRoom.countSites();
                let createWallRepairer  = this.diff(info.roles, 1, 'wallRepairer') && protoRoom.countWalls();
                let createUpgrader      = myRoom.controller.ticksToDowngrade < 300;

                if (createHarvester) {
                    createSmallCreep = 'harvester';
                } else if (createRepairer) {
                    createSmallCreep = 'repairer';
                } else if (createBuilder) {
                    createSmallCreep = 'builder';
                } else if (createWallRepairer) {
                    createSmallCreep = 'wallRepairer';
                } else if (createUpgrader) {
                    createSmallCreep = 'upgrader';
                }

                if (createSmallCreep.length > 0) {
                    spawn.createCreep(params.getBody('normal'), undefined, {
                        role: createSmallCreep
                    });
                }
            }

            if (info.energy == info.energyMax) {
                let createGreatCreep    = '';
                let createHarvester     = this.diff(info.roles, 2, 'harvester');
                let createRepairer      = this.diff(info.roles, 2, 'repairer') && protoRoom.countStructures();
                let createBuilder       = this.diff(info.roles, 2, 'builder') && protoRoom.countSites();
                let createWallRepairer  = this.diff(info.roles, 2, 'wallRepairer') && protoRoom.countWalls();

                if (createHarvester) {
                    createGreatCreep = 'harvester';
                } else if (createRepairer) {
                    createGreatCreep = 'repairer';
                } else if (createBuilder) {
                    createGreatCreep = 'builder';
                } else if (createWallRepairer) {
                    createGreatCreep = 'wallRepairer';
                } else {
                    createGreatCreep = 'upgrader';
                }

                spawn.createCreep(params.getBody('cool'), undefined, {
                    role: createGreatCreep
                });
            }
        }
    }
}

module.exports = prototypeSpawn;
