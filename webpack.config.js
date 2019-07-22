const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
	devtool: "cheap-module-source-map",
	entry: {
		app: [
			path.join(__dirname, 'src/index.js')
		],
		vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
	},
	output: {
		path: path.join(__dirname, './dist'),
		filename: '[name].[chunkhash].js',
		publicPath: '/'
	},
	module: {
		rules: [{
			test: /\.js$/,
			use: ['babel-loader'],
			include: path.join(__dirname, 'src')
		},{
			test: /\.css$/,
			use: ['style-loader', 'css-loader']
		},{
			test: /\.(png|jpg|gif)$/,
			use: ['url-loader?limit=8192']
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.join(__dirname, 'src/index.html')
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new webpack.HashedModuleIdsPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'runtime'
		}),
		new CleanWebpackPlugin()
	],
	resolve: {
		alias: {
			pages: path.join(__dirname, 'src/pages'),
			component: path.join(__dirname, 'src/component'),
			router: path.join(__dirname, 'src/router'),
			actions: path.join(__dirname, 'src/redux/actions'),
			reducers: path.join(__dirname, 'src/redux/reducers'),
		}
	}
}