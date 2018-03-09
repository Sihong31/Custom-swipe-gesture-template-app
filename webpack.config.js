//https://stackoverflow.com/questions/31718908/webpack-output-files-to-different-directories

var webpack = require("webpack"),
    CopyWebpackPlugin = require("copy-webpack-plugin"),
		HtmlWebpackPlugin = require('html-webpack-plugin'),
		ExtractTextPlugin = require("extract-text-webpack-plugin"),
		path = require('path');

module.exports = {
	entry: {
		app: path.resolve(__dirname, './src/js/index.js')
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: './js/bundle.js',
		publicPath: '/build/'
	},
  devServer: {
    inline: true,
    contentBase: './build',
    port: 9001
  },
	devtool: 'source-map',
	node: {
  	fs: 'empty'
	},
	module: {
		preLoaders: [
			{
				test: /\.json$/,
				loader: 'json'
			}
		],
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: 'babel',
				query: {
					presets: ['es2015']
				}
			},
			{
				test: /\.(png|jpg|svg)$/,
				loader: 'url-loader?limit=20000&name=assets/images/[name].[ext]'
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
			}
	 ]
 },
 plugins: [
	 new HtmlWebpackPlugin({
		 filename: 'index.html',
		 template: './src/index.html'
	 }),
	 new ExtractTextPlugin('./styles/bundle.css')
 ]
};
