const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'build')
	},
	module: {
		rules: [
			{
				test: /\.(css|scss)$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
					{ loader: 'sass-loader' }
				]
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env', 'stage-3', 'react'],
						plugins: ['transform-class-properties']
					}
				}
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: {
					loader: 'file-loader',
					options: {
						publicPath: '/static',
						outputPath: '/static'
					}
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/html/index.html'
		})
	],
	resolve: {
		extensions: ['.js', '.jsx']
	},
	devtool: 'source-map'
};