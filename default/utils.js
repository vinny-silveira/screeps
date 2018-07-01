let utils = {

    /**
     * Clears the memory of dead creeps
     *
     * @param {boolean} outPut
     *
     * @return void
     */
    clearMemory: function (outPut = false) {
        let counter = 0;
        for (let name in Memory.creeps) {
            if (Game.creeps[name] === undefined) {
                counter++;
                delete Memory.creeps[name];
            }
        }
        if (outPut) {
            console.log('Total of ' + counter + ' cleaned.');
        }
    },

    /**
     * Get creeps by specified role
     *
     * @param role {String}
     *
     * @returns {Array}
     */
    getCreepsByRole: function (role) {
        let creepList = [];
        for (let creepname in Game.creeps) {
            if (Game.creeps[creepname].memory.role === role) {
                creepList.push(Game.creeps[creepname]);
            }
        }
        return creepList
    },

    /**
     * Controls a newly conquered room
     *
     * @param newRoom   {String}
     * @param spawn     {String}
     */
    controlNewRoom: function (newRoom, spawn) {
        let sp = Game.spawns[spawn];
        let aval = sp.room.energyAvailable;
        let max = sp.room.energyCapacityAvailable;
        let create = (aval === max);
        let to = Game.rooms[newRoom];
        let extras = {'role': 'claimer', 'target': newRoom};

        if (to.find(FIND_MY_CREEPS).length < 3 && create) {
            sp.createCreep(params.getBody('cool'), undefined, extras);
        }
    }
};

module.exports = utils;
