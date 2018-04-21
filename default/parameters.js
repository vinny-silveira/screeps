var parameters = {

    /**
     * Here, contains the body preset for createCreep
     */
    bodys: {
        'normal': [WORK,CARRY,MOVE],
        'claimer': [CLAIM,WORK,CARRY,MOVE],
        'cool': [WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE]
    },

    /**
     * Here, contains all roles
     */
    roles: [
        'harvester',
        'tester',
        'upgrader',
        'builder',
        'wallRepairer',
        'repairer',
    ],

    /**
     * Relation of spawn <-> room
     */
    spawns: {
        'E54N57': 'Home',
        'E55N57': 'House'
    },

    /**
     * Min damage for a structure to be healed
     */
    minHits: {
        'walls': 3000,
        'others': 2500 // All non-wall structures...
    },

    /**
     * Default sources for some roles...
     */
    defaultSource: {
        'builder': 1,
        'harvester': 1,
        'upgrader': 0
    },

    /**
     * Sign for controller
     */
    signText: "Good programmers write code that humans can understand.",

    /**
     * Return spawn from specified room
     *
     * @param {String} room
     *
     * @return {StructureSpawn}
     */
    getSpawnFromRoom: function(room){
        let spawnName = this.inArray(this.spawns, room);
        return this.getSpawn(spawnName);
    },

    /**
     * Check if key exists and return it
     *
     * @param {Array} array
     * @param {String} key
     * @throws If key not exist
     *
     * @return mixed
     */
    inArray: function(array, key){
        if (array[key] != undefined) {
            return array[key];
        } else {
            throw new Error(key + ' not found!');
        }
    },

    /**
     * Return the required body
     *
     * @param {String} bodyType
     *
     * @return {Array}
     */
    getBody: function(bodyType){
        return this.inArray(this.bodys, bodyType);
    },

    /**
     * Return the required spawn
     *
     * @param {String} spawn
     *
     * @return {StructureSpawn}
     */
    getSpawn: function(spawn){
        return this.inArray(Game.spawns, spawn);
    },

    /**
     * Return the required room
     *
     * @param {String} room
     *
     * @return {Room}
     */
    getRoom: function(room){
        return this.inArray(Game.rooms, room);
    }
}

module.exports = parameters;
