var params      = require('parameters');
var protoRoom   = require('prototype.room');

var prototypeSpawn = {

    /**
     * Diff
     *
     * @param {Array}   array
     * @param {number}  value
     * @param {mixed}   key
     *
     * @return {boolean}
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
            let myRoom      = params.getRoom(info.name);
            let spawnName   = params.getSpawnFromRoom(info.name);
            let spawn       = params.getSpawn(spawnName);

            protoRoom.setRoom(myRoom);

            if (info.energy >= 200) {
                let createSmallCreep = '';
                if (this.diff(info.roles, 1, 'harvester')) {
                    createSmallCreep = 'harvester';
                }
                if (myRoom.controller.ticksToDowngrade < 300) {
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
