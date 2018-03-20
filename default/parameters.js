var parameters = {

    /**
     * Here, contains the body preset for createCreep
     */
    bodys: {
        'normal': [WORK,CARRY,MOVE],
        'cool': [WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE]
    },

    /**
     * Here, contains my spawns with your nick for easy access
     */
    mySpawns: {
        's1': Game.spawns['Home']
    },

    /**
     * Here, contains my rooms with your nick for easy access
     */
    myRooms: {
        'r1': Game.rooms['E54N57']
    },

    /**
     * Chec if key exists and return it
     *
     * @param Array array
     * @param string key
     * @throws If key not exist
     *
     * @return mixed
     */
    inArray: function(array, key){
        if(key in array){
            return array[key]
        } else {
            throw key+' not found!'
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
        return this.inArray(this.bodys, bodyType)
    },

    /**
     * Return the required spawn
     *
     * @param string spawn
     *
     * @return {StructureSpawn}
     */
    getSpawn: function(spawn){
        return this.inArray(this.mySpawns, spawn);
    },

    /**
     * Return the required room, ifnull, throw!!
     *
     * @param string room
     *
     * @return {Room}
     */
    getRoom: function(room){
        return this.inArray(this.myRooms, room);
    }
}

module.exports = parameters;
