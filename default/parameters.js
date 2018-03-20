var parameters = {

    /**
     * Here, contains the body preset for createCreep
     */
    bodys: {
        'normal': [WORK,CARRY,MOVE],
        'cool': [WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE]
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
