module.exports = {
	entry: './public/javascripts/app.es6',
	publicPath: '/build/',
	output: {
		path: './public/bundle',
		filename: 'app.js'
	},
	module: {
		loaders: [
			{ test: /\.jsx/, exclude: /node_modules/, loader: "babel"},
			{ test: /\.es6/, exclude: /node_modules/, loader: "babel"},
			{ test: /png|jpg|jpeg|gif|svg/, exclude: /node_modules/, loader: "url-loader"},
			{ test: /\.(otf|eot|svg|ttf|woff|woff2).*$/, loader: 'url-loader?name=[path][name].[ext]'},
			{ test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }
		]
	}
};