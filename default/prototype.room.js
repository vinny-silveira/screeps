let prototypeRoom = {

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
    setRoom: function (room) {
        this.room = room;
    },

    /**
     * Count constructions sites
     *
     * @return {Number}
     */
    countSites: function () {
        return this.room.find(FIND_CONSTRUCTION_SITES).length;
    },

    /**
     * Count walls that can be healed
     *
     * @return {Number}
     */
    countWalls: function () {
        return this.room.find(FIND_STRUCTURES, {
            filter: (s) => (
                s.structureType === STRUCTURE_WALL && s.hits <= params.minHits['walls']
            )
        }).length;
    },

    /**
     * Count roads, ramparts, etc.. that can be healed
     *
     * @return {Number}
     */
    countStructures: function () {
        return this.room.find(FIND_STRUCTURES, {
            filter: (s) => s.hits <= params.minHits['others'] && (
                s.structureType !== STRUCTURE_WALL &&
                s.structureType !== STRUCTURE_EXTENSION
            )
        }).length;
    },
};

module.exports = prototypeRoom;
