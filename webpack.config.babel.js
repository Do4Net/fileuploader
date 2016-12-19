import path from 'path';
import fs from 'fs';
module.exports = { 
	entry: {
	   	uploadFile:"./target/uploadfile/index.js"
	      },
	output: {
		path: path.join(__dirname, 'dist'),
		publicPath: '/public/',
		filename: '[name].bundle.js',
		chunkFilename: '[id].bundle.js'
	}
};
 