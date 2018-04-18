var prototypeRoom = {

    /**
     * The room...
     */
    room: null,

    /**
     * Set the room for execute any action
     *
     * @param {Room} room
     *
     * @return void
     */
    setRoom: function(room) {
        this.room = room;
    },

    /**
     * Count constructions sites
     *
     * @return {number}
     */
    countSites: function(){
        return this.room.find(FIND_CONSTRUCTION_SITES).length;
    },

    /**
     * Count walls that can be healed
     *
     * @return {number}
     */
    countWalls: function(){
        return this.room.find(FIND_STRUCTURES, {
            filter: (s) => (
                s.structureType == STRUCTURE_WALL && s.hits <= 3000
            )
        }).length;
    },

    /**
     * Count roads, ramparts, etc.. that can be healed
     *
     * @return {number}
     */
    countStructures: function(){
        return this.room.find(FIND_STRUCTURES, {
            filter: (s) => s.hits <= 2500 && (
                s.structureType != STRUCTURE_WALL &&
                s.structureType != STRUCTURE_EXTENSION
            )
        }).length;
    },

}

module.exports = prototypeRoom;
