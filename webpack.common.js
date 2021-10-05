const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
require('dotenv').config({ path: './.env' }); 

module.exports = {
	entry: {
		index: "./src/index.tsx",
	},
	output: {
		filename: "[name].[contenthash].js",
		path: path.resolve(__dirname, "dist"),
		chunkFilename: "[name].[contenthash].js",
		publicPath: "/",
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{ from: "./public/img", to: "./img/" }
			],
		}),
		new webpack.DefinePlugin({
				'process.env': JSON.stringify(process.env),
		})
	],
	resolve: {
		alias: {
			"@local/api": path.resolve(__dirname, "src/api"),
			"@local/layout": path.resolve(__dirname, "src/components/layout"),
			"@local/shared": path.resolve(__dirname, "src/components/shared"),
			"@local/form": path.resolve(__dirname, "src/components/form"),
			"@local/views": path.resolve(__dirname, "src/components/views"),
			"@local/modals": path.resolve(__dirname, "src/components/modals"),
			"@local/constants": path.resolve(__dirname, "src/constants"),
			"@local/modules": path.resolve(__dirname, "src/store/modules"),
			"@local/utils": path.resolve(__dirname, "src/utils"),
		},
		extensions: [".js", ".jsx", ".ts", ".tsx"],
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(png|jpg|jpeg|svg)$/,
				exclude: /node_modules/,
				loader: "file-loader",
			},
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react"],
						plugins: [
							"@babel/plugin-syntax-dynamic-import",
							"@babel/plugin-proposal-class-properties",
						],
					},
				},
			},
		],
	},
};