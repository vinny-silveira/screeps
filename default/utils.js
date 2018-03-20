var utils = {

	/**
	 * Clears the memory of dead creeps
	 *
	 * @param boolean outPut
	 *
	 * @return void
	 */
	clearMemory: function(outPut = false){
		for (let name in Memory.creeps) {
			if (Game.creeps[name] == undefined) {
				delete Memory.creeps[name];
			}
		}
	}
}

module.exports = utils;
