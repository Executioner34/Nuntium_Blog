const pugPlugin = require('pug-plugin')
const path = require('path')
const autoPrefixer = require('autoprefixer')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')

module.exports = {
	entry: './src/index.pug',
	output: {
		filename: '[name].[hash].js',
		path: path.resolve(__dirname + '/dist'),
		publicPath: 'Nuntium_Blog',
	},
	resolve: {
		alias: {
			Images: path.join(__dirname, './src/assets/images'),
			Fonts: path.join(__dirname, './src/assets/fonts/'),
			Favicon: path.join(__dirname, './src/assets/favicon'),
		},
	},
	devServer: {
		static: {
			directory: path.join(__dirname, './src'),
			watch: true, // <--
		},
		devMiddleware: {
			writeToDisk: true, // <--
		},
		open: ['main.html'],
		hot: true,
		port: 9000,
	},
	plugins: [
		new pugPlugin({
			modules: [
				pugPlugin.extractCss({
					filename: '[name].[contenthash:8].css',
				}),
			],
		}),
		new CssMinimizerPlugin(),
		new CleanWebpackPlugin(),
		// new copyPlugin({
		// 	patterns: [{ from: './src/assets', to: path.join(__dirname, './dist/images') }],
		// }),
	],
	module: {
		rules: [
			{
				test: /\.(scss|css)$/,
				use: [
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
						},
					},
					'sass-loader',
				],
			},
			{
				test: /\.(pug|jade)$/,
				use: [
					{
						loader: 'html-loader',
						options: {
							// Webpack use CommonJS module
							esModule: false,
							// sources: {
							// 	// ignore not exists sources
							// 	urlFilter: (attribute, value) => path.isAbsolute(value) && fs.existsSync(value),
							// },
						},
					},
					{
						loader: pugPlugin.loader,
						options: {
							method: 'html',
						},
					},
				],
			},
			{
				test: /\.(png|jpg|jpeg|ico)/,
				type: 'asset/resource',
				generator: {
					// output filename for images
					filename: 'assets/img/[name].[hash:8][ext]',
				},
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
				type: 'asset/resource',
				generator: {
					// output filename for fonts
					filename: 'assets/fonts/[name][ext][query]',
				},
			},
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
		],
	},
	optimization: {
		minimizer: [
			new CssMinimizerPlugin(),
			new ImageMinimizerPlugin({
				minimizer: {
					implementation: ImageMinimizerPlugin.squooshMinify,
					options: {
						encodeOptions: {
							mozjpeg: {
								// That setting might be close to lossless, but it’s not guaranteed
								// https://github.com/GoogleChromeLabs/squoosh/issues/85
								quality: 100,
							},
							webp: {
								lossless: 1,
							},
							avif: {
								// https://github.com/GoogleChromeLabs/squoosh/blob/dev/codecs/avif/enc/README.md
								cqLevel: 0,
							},
						},
					},
				},
			}),
		],
	},
};