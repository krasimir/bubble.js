var fs = require('fs');
var UglifyJS = require('uglify-js');
var result = UglifyJS.minify(__dirname + '/src/bubble.js');

fs.writeFile(__dirname + '/build/bubble.min.js', result.code, function(err) {
	console.log('Building successful.');
});