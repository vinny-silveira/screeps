let params      = require('parameters');
let protoRoom   = require('prototype.room');

let prototypeSpawn = {

    /**
     * Diff
     *
     * @param {Object}          array
     * @param {Number}          value
     * @param {String|Number}   key
     *
     * @return {Boolean}
     */
    diff: function (array, value, key) {
        return (array[key] < value || array[key] === undefined);
    },

    /**
     * Spawn creeps...
     *
     * @param {Array} creeps
     *
     * @return void
     */
    spawnner: function (creeps) {
        for (let info of creeps) {
            let myRoom  = params.getRoom(info.name);
            let spawn   = params.getSpawnFromRoom(info.name);
            let extras  = {'role': ''};

            protoRoom.setRoom(myRoom);

            if (info.energy === info.energyMax) {
                let createHarvester     = this.diff(info.roles, 2, 'harvester');
                let createRepairer      = this.diff(info.roles, 2, 'repairer') && protoRoom.countStructures();
                let createBuilder       = this.diff(info.roles, 2, 'builder') && protoRoom.countSites();
                let createWallRepairer  = this.diff(info.roles, 2, 'wallRepairer') && protoRoom.countWalls();

                if (createHarvester) {
                    extras.role = 'harvester';
                    extras.provider = 1;
                } else if (createRepairer) {
                    extras.role = 'repairer';
                } else if (createBuilder) {
                    extras.role = 'builder';
                } else if (createWallRepairer) {
                    extras.role = 'wallRepairer';
                } else {
                    extras.role = 'upgrader';
                }

                spawn.createCreep(params.getBody('cool'), undefined, extras);
            } else if (info.energy >= 200) {
                let createHarvester     = this.diff(info.roles, 1, 'harvester');
                let createRepairer      = this.diff(info.roles, 1, 'repairer') && protoRoom.countStructures();
                let createBuilder       = this.diff(info.roles, 1, 'builder') && protoRoom.countSites();
                let createWallRepairer  = this.diff(info.roles, 1, 'wallRepairer') && protoRoom.countWalls();
                let createUpgrader      = myRoom.controller.ticksToDowngrade < 300;

                if (createHarvester) {
                    extras.role = 'harvester';
                    extras.provider = 1;
                } else if (createRepairer) {
                    extras.role = 'repairer';
                } else if (createBuilder) {
                    extras.role = 'builder';
                } else if (createWallRepairer) {
                    extras.role = 'wallRepairer';
                } else if (createUpgrader) {
                    extras.role = 'upgrader';
                }

                if (extras.role.length > 0) {
                    spawn.createCreep(params.getBody('normal'), undefined, extras);
                }
            }
        }
    }
};

module.exports = prototypeSpawn;
