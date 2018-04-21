var utils = {

	/**
	 * Clears the memory of dead creeps
	 *
	 * @param boolean outPut
	 *
	 * @return void
	 */
	clearMemory: function(outPut = false){
		let counter = 0;
		for (let name in Memory.creeps) {
			if (Game.creeps[name] == undefined) {
				counter ++;
				if(outPut){
					console.log('Memory of creep ' + name + ' cleaned.');
				}
				delete Memory.creeps[name];
			}
		}
		console.log('Total of ' + counter + ' cleaned.');
	}
}

module.exports = utils;
