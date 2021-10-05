const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
		port: 8081,
    hot: true,
    historyApiFallback: {
      port: 8081,
      index: "/",
    },
  },
	plugins: [
		new HtmlWebpackPlugin({
			template: "public/webpack-index-test-template.html",
		}),
	]
});
