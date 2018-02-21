const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' }
				]
			},
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env', 'stage-3']
					}
				}
			  }
		]
	},
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
	},
	devtool: 'source-map'
};