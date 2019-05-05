const DEFAULT_SPECS = './test/**/*.spec.js';
const glob = require( 'glob' );

exports.configUtil = {
	getSpecs: () => {
		let specs = [ process.env.SPECS || DEFAULT_SPECS ];
		if( process.env.SEARCH ){
		    
		    let tests = glob.sync( 'test/**/*.spec.js' );
		    specs = tests.filter( 
		        o => o.toLowerCase().includes(process.env.SEARCH.toLowerCase())
		    );
		}

		return specs;
	},

	getExcludes: () => {
		let excludes = [];
		if( process.env.EXCLUDES ){

			let tests = glob.sync( DEFAULT_SPECS );
			let items = process.env.EXCLUDES.split(',');
			items.forEach((i)=>{

				let search_string = i.trim();
				let to_exclude = tests.filter((o)=>o.toLowerCase().includes(search_string));
				excludes = excludes.concat(to_exclude);
			});

			excludes = excludes.map((o)=> `./${o}`);
		}

		return excludes;
	},

	searchPath: ( binaries = [] ) => {
		if (typeof binaries === 'string' || binaries instanceof String){
			binaries = [ binaries ];
		}
		let path_items = [];
		const _ = require('lodash');
		for (var i = 0; i < binaries.length; i++) {
			if( binaries[i].length ){
				path_items = _.merge( 
					path_items, 
					process.env.PATH.split(':').filter( o => o.toLowerCase().includes( binaries[i] ) ) 
				);
				console.log(binaries[i],path_items);
			}
		}
		return path_items;
	},
};