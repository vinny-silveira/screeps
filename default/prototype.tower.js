let tower = {

    /**
     * Routine of one Tower
     *
     * @param {Room} room
     *
     * @return void
     */
    run: function (room) {
        let towers = room.find(FIND_MY_STRUCTURES, {
            filter: {structureType: STRUCTURE_TOWER}
        });

        towers.forEach(function (tower) {
            let closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (closestHostile) {
                tower.attack(closestHostile);
            }
        });
    }
};

module.exports = tower;
