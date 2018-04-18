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
     * Return spawnName from specified room
     *
     * @param {string} room
     *
     * @return {string}
     */
    getSpawnFromRoom: function(room){
        return this.inArray(this.spawns, room);
    },

    /**
     * Check if key exists and return it
     *
     * @param Array array
     * @param string key
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
     * @param string bodyType
     *
     * @return Array
     */
    getBody: function(bodyType){
        return this.inArray(this.bodys, bodyType);
    },

    /**
     * Return the required spawn
     *
     * @param string spawn
     *
     * @return {StructureSpawn}
     */
    getSpawn: function(spawn){
        return this.inArray(Game.spawns, spawn);
    },

    /**
     * Return the required room, ifnull, throw!!
     *
     * @param string room
     *
     * @return {Room}
     */
    getRoom: function(room){
        return this.inArray(Game.rooms, room);
    }
}

module.exports = parameters;
