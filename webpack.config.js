const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => ({
	mode: 'development',
	entry: path.resolve(__dirname, 'src', 'index.js'),
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
	devtool: 'inline-source-map',
	devServer: {
	  open: true,
	  hot: true
	},
	module: {
	  rules: [
	  	{
	  	  test: /\.(jsx|js)$/,
	  	  include: path.resolve(__dirname, 'src'),
	  	  exclude: /node_modules/,
	  	  use: [{
	  	  	loader: 'babel-loader',
	  	  	options: {
	  	  		presets: [
	  	  			['@babel/preset-env', {
	  	  				targets: 'defaults'
	  	  			}],
	  	  			'@babel/preset-react'
	  	  		]
	  	  	}
	  	  }],
	  	},
	  	{
	    	test: /\.css$/i,
	    	include: path.resolve(__dirname, 'src'),
	    	exclude: /node_modules/,
	    	use: [
	    		'style-loader',
	    		{
	    			loader: 'css-loader',
	    			options: {
	    				importLoaders: 1,
	    				modules: true
	    			}
	    		}
	    	]
	  	},
	  ],
	},
	plugins: [
	  new HtmlWebpackPlugin({
	  	template: 'index.html',
	  }),
	  new webpack.HotModuleReplacementPlugin()
	],
});