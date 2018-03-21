var prototypeCreep = {

	/**
	 * This function try not execute PathFinding if is possible for
	 * improve CPU usage.
	 *
	 * @param {Creep} 			creep
	 * @param {RoomPosition} 	target
	 *
	 * @return void
	 */
	creepMove: function(creep, target){
		let options = {
			noPathFinding: true,
			visualizePathStyle: {stroke: '#ffffff'}
		};
		if (creep.moveTo(target, options) == ERR_NOT_FOUND) {
			options.noPathFinding = false;
			creep.moveTo(target, options);
		} else {
			creep.moveTo(target, options);
		}
	},

	/**
	 * Execute transfer of specified resource to target
	 *
	 * @param {Creep} 			creep
	 * @param {RoomPosition} 	target
	 *
	 * @return void
	 */
	creepTransfer: function(creep, target, resourceType) {
		creep.say('⚡ transfer');
		if (creep.transfer(target, resourceType) == ERR_NOT_IN_RANGE) {
			this.creepMove(creep, target);
		}
	},

	/**
	 * Harvest in target
	 *
	 * @param {Creep} 			creep
	 * @param {RoomPosition} 	target
	 *
	 * @return void
	 */
	creepHarvest: function(creep, target) {
		creep.say('⛏️ harvest');
		if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
			this.creepMove(creep, target);
		}
	},

	/**
	 * Build specified construction
	 *
	 * @param {Creep} 				creep
	 * @param {ConstructionSite} 	construction
	 *
	 * @return void
	 */
	creepBuild: function(creep, construction) {
		creep.say('🚧 build');
		if (creep.build(construction) == ERR_NOT_IN_RANGE) {
			this.creepMove(creep, construction);
		}
	},

	/**
	 * Upgrade specified controller
	 *
	 * @param {Creep} 				creep
	 * @param {StructureController} controller
	 *
	 * @return void
	 */
	creepUpgrade: function(creep, controller) {
		creep.say('⚡ upgrade');
		if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
			this.creepMove(creep, controller)
		}
	},

	/**
	 * Repair specified structure
	 *
	 * @param {Creep} 		creep
	 * @param {Structure} 	structure
	 *
	 * @return void
	 */
	creepRepair: function(creep, structure) {
		creep.say('🛠️ repair');
		if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
			this.creepMove(creep, structure)
		}
	},

	/**
	 * Repair specified structure
	 *
	 * @param {Creep} 					creep
     * @param {StructureController} 	controller
	 *
	 * @return void
	 */
	creepSign: function(creep, controller, signText){
		creep.say('🖉️ sign');
		if (creep.signController(controller, signText) == ERR_NOT_IN_RANGE) {
			this.creepMove(creep, controller);
		}
	}
}

module.exports = prototypeCreep
