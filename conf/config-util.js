const DEFAULT_SPECS = './test/**/*.spec.js';
const glob = require( 'glob' );
const fs = require( 'fs' );

module.exports = {

	getArgString ( arg ) {
		if ( !arg ) {
			return '';
		}

		let results = process.argv.find( ( o ) => o.includes( `--${arg}=` ) );
		if ( !results ) {
			results = '';
		}

		return results.replace( `--${arg}=`, '' );
	},

	search ( search_string ) {
		if ( !search_string ) {
			return [];
		}

		search_string = search_string.toLowerCase();

		const tests = glob.sync( DEFAULT_LOCATION );
		const matches = tests.map( o => o.toLowerCase() ).filter( o => o.includes( search_string ) );
		console.log( `searching for specs that match '${search_string}' found ${matches.length} matches`, matches );
		return matches;
	},

	getSpecs () {
		let specs = [ process.env.SPECS || DEFAULT_SPECS ];
		if( process.env.SEARCH ){
		    
		    let tests = glob.sync( 'test/**/*.spec.js' );
		    specs = tests.filter( 
		        o => o.toLowerCase().includes(process.env.SEARCH.toLowerCase())
		    );
		}

		return specs;
	},

	getExcludes () {
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

	searchPath ( binaries = [] ) {
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

	checkBrowserVersion () {
		let versions = [];
		if( require('fs').existsSync('node_modules/puppeteer') ){
			const binary = `${require('puppeteer').executablePath()}`;
    		versions.push({
    			puppeteer: {
    				path: binary,
    				version: require('shelljs').exec(`${binary} --version`, {silent:true}).stdout.replace(/\n$/, ''),
    			}
    		});
    	}
    	return versions;
	},

	parseJunit ( directory ) {

		if ( ! directory ) {
			throw new Error( 'parseJunit missing argument: directory' );
		}

		const files = glob.sync( `${directory}/*.xml` );
		const xml2js = require('xml2js');

		let tally = {
			total: 0,
			errors: 0,
			failures: 0,
			skipped: 0,
			files: files.length,
		};

		for ( let i = 0; i < files.length; i++ ) {
			//console.log(files[i]);
			const contents = fs.readFileSync( files[i], 'utf8' );
			const parser = new xml2js.Parser();
			parser.parseString(contents, function (err, result) {

				if( result && result.testsuites ){
					const suite = result['testsuites'];
					if( suite && suite.testsuite ){

						const row = suite.testsuite[0]['$'];
						tally.total += parseInt(row.tests);
						tally.errors += parseInt(row.errors);
						tally.failures += parseInt(row.failures);
						tally.skipped += parseInt(row.skipped);
					} else {
						console.log('invalid');
					}
				}
			});
		}

		if( tally.total > 0 ) {
			tally['errors%'] = Number((tally.errors / tally.total)*100).toFixed(2);
			tally['skipped%'] = Number((tally.skipped / tally.total)*100).toFixed(2);
			tally['failures%'] = Number((tally.failures / tally.total)*100).toFixed(2);
		}

		console.dir(JSON.stringify(tally));

		return tally;
	},

	doesTextExistInFiles ( search, path ) {

		if ( !search || !path ) {
			throw new Error( 'doesTextExistInFiles missing arguments' );
		}

		const tests = glob.sync( path );

		for ( let i = 0; i < tests.length; i++ ) {

			const contents = fs.readFileSync( tests[i], 'utf8' );

			if ( contents.includes( search ) ) {
				return true;
			}
		}

		return false;
	},
};