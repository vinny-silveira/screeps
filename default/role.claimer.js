let roleBuilder     = require('role.builder');
let roleUpgrader    = require('role.upgrader');

let roleClaimer = {

    /**
     * Routine of one Claimer
     *
     * @param {Creep} creep
     *
     * @return void
     */
    run: function (creep) {
        if (creep.room.name !== creep.memory.target) {
            let exit = creep.room.findExitTo(creep.memory.target);
            let path = creep.pos.findClosestByPath(exit);
            prototypeCreep.creepMove(creep, path);
        } else {
            let newController = creep.room.controller;
            let owner = newController.owner;
            if (owner === undefined || owner.username !== params.user) {
                prototypeCreep.creepClaim(creep, newController);
            } else if (newController.ticksToDowngrade < 300) {
                roleUpgrader.run(creep);
            } else {
                roleBuilder.run(creep);
            }
        }
    }
};

module.exports = roleClaimer;
