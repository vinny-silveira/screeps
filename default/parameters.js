let parameters = {

    /**
     * Your username
     */
    user: 'vinny_silveira',

    /**
     * Here, contains the body preset for createCreep
     */
    bodys: {
        'normal': [WORK, CARRY, MOVE],
        'claimer': [CLAIM, WORK, CARRY, MOVE],
        'cool': [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE]
    },

    /**
     * Min roles per room
     */
    minRoles: {
        'E53N57': {
            'harvester': 1,
            'repairer': 1,
            'builder': 2,
            'wallRepairer': 0,
            'upgrader': 2,
            'defaultBody': 'normal'
        },
        'E54N57': {
            'harvester': 2,
            'repairer': 2,
            'builder': 1,
            'wallRepairer': 1,
            'upgrader': 3,
            'defaultBody': 'cool'
        },
        'E55N57': {
            'harvester': 2,
            'repairer': 2,
            'builder': 1,
            'wallRepairer': 1,
            'upgrader': 4,
            'defaultBody': 'cool'
        },
    },

    /**
     * Relation of spawn <-> room
     */
    spawns: {
        'E53N57': 'Spawn',
        'E54N57': 'Home',
        'E55N57': 'House',
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
    signText: "Keyboard not found! Press F1.",

    /**
     * Return spawn from specified room
     *
     * @param {String} room
     *
     * @return {StructureSpawn}
     */
    getSpawnFromRoom: function (room) {
        let spawnName = this.inArray(this.spawns, room);
        return this.getSpawn(spawnName);
    },

    /**
     * Check if key exists and return it
     *
     * @param {Array|Object}    array
     * @param {String}          key
     * @throws If key not exist
     *
     * @return mixed
     */
    inArray: function (array, key) {
        if (array[key] !== undefined) {
            return array[key];
        } else {
            throw new Error(JSON.stringify(key) + ' not found!');
        }
    },

    /**
     * Return the required body
     *
     * @param {String} bodyType
     *
     * @return {Array}
     */
    getBody: function (bodyType) {
        return this.inArray(this.bodys, bodyType);
    },

    /**
     * Return the required spawn
     *
     * @param {String} spawn
     *
     * @return {StructureSpawn}
     */
    getSpawn: function (spawn) {
        return this.inArray(Game.spawns, spawn);
    },

    /**
     * Return the required room
     *
     * @param {String} room
     *
     * @return {Room}
     */
    getRoom: function (room) {
        return this.inArray(Game.rooms, room);
    }
};

module.exports = parameters;
