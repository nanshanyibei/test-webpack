const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: {
		app: [
			'react-hot-loader/patch',
			path.join(__dirname, 'src/index.js')
		],
		vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
	},
	output: {
		path: path.join(__dirname, './dist'),
		filename: '[name].[hash].js',
		chunkFilename: '[name].[chunkhash].js'
	},
	module: {
		rules: [{
			test: /\.js$/,
			use: ['babel-loader?cacheDirectory=true'],
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
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: 'vendor'
		// })
	],
	devServer: {
		port: 8080,
		contentBase: path.join(__dirname, './dist'),
		historyApiFallback: true,
		host: '0.0.0.0'
	},
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