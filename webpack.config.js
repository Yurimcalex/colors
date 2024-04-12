const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
	devtool: 'inline-source-map',
	module: {
	  rules: [
	  	{
	  	  test: /\.js$/,
	  	  use: 'babel-loader',
	  	  exclude: /node_modules/
	  	},
	  	{
	    	test: /\.css$/,
	    	use: ['style-loader', 'css-loader']
	  	},
	  ],
	},
	plugins: [
	  new HtmlWebpackPlugin({
	  	template: 'index.html',
	  }),
	],
};