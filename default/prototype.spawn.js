let protoRoom = require('prototype.room');

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
            let body    = params.minRoles[info.name]['defaultBody'];

            protoRoom.setRoom(myRoom);

            let structs = protoRoom.countStructures();
            let sites   = protoRoom.countSites();
            let walls   = protoRoom.countWalls();

            let minHarvester    = params.minRoles[info.name]['harvester'];
            let minRepairer     = params.minRoles[info.name]['repairer'];
            let minBuilder      = params.minRoles[info.name]['builder'];
            let minWallRepairer = params.minRoles[info.name]['wallRepairer'];
            let minUpgrader     = params.minRoles[info.name]['upgrader'];

            if (info.energy === info.energyMax) {
                let createHarvester     = this.diff(info.roles, minHarvester, 'harvester');
                let createRepairer      = this.diff(info.roles, minRepairer, 'repairer') && structs;
                let createBuilder       = this.diff(info.roles, minBuilder, 'builder') && sites;
                let createWallRepairer  = this.diff(info.roles, minWallRepairer, 'wallRepairer') && walls;
                let createUpgrader      = this.diff(info.roles, minUpgrader, 'upgrader');

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
            }
            else if (info.energy >= 200) {
                let createHarvester = this.diff(info.roles, 1, 'harvester');
                let createRepairer  = this.diff(info.roles, 1, 'repairer') && structs;
                let createUpgrader  = myRoom.controller.ticksToDowngrade < 300;
                body                = 'normal';

                if (createHarvester) {
                    extras.role = 'harvester';
                    extras.provider = 1;
                } else if (createRepairer) {
                    extras.role = 'repairer';
                } else if (createUpgrader) {
                    extras.role = 'upgrader';
                }
            }
            if (extras.role.length > 0) {
                spawn.createCreep(params.getBody(body), undefined, extras);
            }
        }
    }
};

module.exports = prototypeSpawn;
