// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = isProduction
	? MiniCssExtractPlugin.loader
	: "style-loader";

const config = {
	devtool: "inline-source-map",
	entry: "./src/app.ts",
	output: {
		path: path.resolve(__dirname, "dist"),
	},
	devServer: {
		open: true,
		host: "localhost",
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			filename: "index.html",
			inject: "body",
		}),
		new HtmlWebpackPlugin({
			template: "./src/views/login.html",
			filename: "login.html",
			inject: "body",
		}),
		new HtmlWebpackPlugin({
			template: "./src/views/utenti.html",
			filename: "utenti.html",
			inject: "body",
		}),

		// Add your plugins here
		// Learn more about plugins from https://webpack.js.org/configuration/plugins/
	],
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/i,
				loader: "ts-loader",
				exclude: ["/node_modules/"],
			},
			{
				test: /\.pug$/,
				use: [
					{
						loader: "pug-loader",
					},
				],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					stylesHandler,
					"css-loader",
					"postcss-loader",
					"sass-loader",
				],
			},
			{
				test: /\.css$/i,
				use: [stylesHandler, "css-loader", "postcss-loader"],
			},
			{
				test: /\.html$/i,
				loader: "html-loader",
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
				type: "asset",
			},

			// Add your rules for custom modules here
			// Learn more about loaders from https://webpack.js.org/loaders/
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js", ".html"],
	},
};

module.exports = () => {
	if (isProduction) {
		config.mode = "production";

		config.plugins.push(new MiniCssExtractPlugin());

		config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
	} else {
		config.mode = "development";
	}
	return config;
};
