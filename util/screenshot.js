const fs = require( 'fs' );
const path = require( 'path' );
const PNG = require( 'pngjs' ).PNG;
const pixelmatch = require( 'pixelmatch' );

exports.getImageBase64 = function ( imagePath ) {
	let base64 = null;

	if ( fs.existsSync( imagePath ) ) {
		base64 = browser.call( () => {
			return new Promise( ( resolve ) => {
				const bitmap = fs.readFileSync( imagePath );
				resolve( new Buffer( bitmap ).toString( 'base64' ) );
			} );
		} );
	}

	return base64;
};

exports.readImage = function readImage ( filename, doneCallback ) {
	return fs.createReadStream( path.join( path.resolve(), filename ) ).pipe( new PNG() ).on( 'parsed', doneCallback );
};

exports.base64ToHtmlImage = function base64ToHtmlImage ( base64, title = 'ScreenShot' ) {
	if ( base64 ) {
		return (
			`<div>
				<p>${title}</p>
				<img src="data:image/png;base64, ${base64} " />
			</div>`
		);
	}
	return ( '<div></div>' );

};

// TODO testing to verify that it writes every time
exports.getImageDiff = function ( imagePath1, imagePath2, diffPath = 'diff.png' ) {
	let base64 = {};

	if ( fs.existsSync( imagePath1 ) && fs.existsSync( imagePath2 ) ) {
		base64 = browser.call( () => {

			return new Promise( ( resolve, reject ) => {

				const img1 = fs.createReadStream( imagePath1 ).pipe( new PNG() ).on( 'parsed', doneReading );
				const img2 = fs.createReadStream( imagePath2 ).pipe( new PNG() ).on( 'parsed', doneReading );
				let filesRead = 0;

				function doneReading () {
					if ( ++filesRead < 2 ) return;
					const diff = new PNG( { width: img1.width, height: img1.height } );
					const difference = pixelmatch( img1.data, img2.data, diff.data, img1.width, img1.height, { threshold: 0.1 } );

					const write = fs.createWriteStream( diffPath );
					diff.pack().pipe( write );
					write.on( 'finish', () => {
						const image = fs.readFileSync( diffPath );
						const base64 = new Buffer( image ).toString( 'base64' );
						resolve( { diff: difference, base64 } );
					} );

					write.on( 'error', () => {
						reject( { diff: difference, base64: 'error' } );
					} );
				}
			} );
		} );
	}

	return base64;
};
