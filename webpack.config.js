var webpack = require("webpack")

module.exports = {
    entry: "./src/controller.js",
    output: {
        path: __dirname,
        filename: "index.min.js",
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel",
                query: {
                    presets: ["react","es2015"]
                },
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.svg$/,
                loader: "raw",
            },
        ]
    }
}
