const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconWebpackPlugin = require('favicons-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
	entry: './src/index.js',
	output: {
		filename: '[name].[hash].js',
		path: __dirname + '/dist',
		publicPath: '/Nuntium_Blog/',
	},
	devServer: {
		static: {
			directory: path.join(__dirname, './dist'),
			watch: true,
		},
		devMiddleware: {
			writeToDisk: true,
		},
		historyApiFallback: true,
		open: true,
		hot: true,
		port: 3000,
		
	},
	cache: {
		type: 'filesystem',
	},
	module: {
		rules: [
			{
				test: /\.((c|sa|sc)ss)$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
			},
			{
				test: /\.(png|jpg|jpeg|ico|svg)$/i,
				type: 'asset/resource',
				generator: {
					// output filename for images
					filename: 'assets/img/[name].[ext]',
				},
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
				generator: {
					// output filename for fonts
					filename: 'fonts/[name][ext][query]',
				},
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
					  cacheDirectory: true,
					  presets: ["@babel/preset-env"],
					  plugins: ['@babel/plugin-transform-runtime']
					}
				  }
			  },
		],
	},
	resolve: {
		alias: {
			handlebars: 'handlebars/dist/handlebars.js',
		},
		fallback: {
			page: require.resolve('page')
		}
	},
	plugins: [
		new HTMLWebpackPlugin({
			filename: 'index.html',
			template: './src/index.html',
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[hash].css',
		}),
		new FaviconWebpackPlugin({
			logo: './src/assets/favicon/NuntiumFavicon.svg',
			publicPath: './assets/img/',
			outputPath: './assets/img/',
			prefix: '',
			inject: true
		}),
		new CleanWebpackPlugin(),
	],
	optimization: {
		usedExports: true,
	},
};
