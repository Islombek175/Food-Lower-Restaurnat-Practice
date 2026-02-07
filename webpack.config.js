const path = require('node:path')

module.exports = {
	mode: 'production',
	entry: './js/script.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	watch: true,
	devtool: 'source-map',
	module: {},
}
