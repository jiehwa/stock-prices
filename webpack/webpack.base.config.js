/**
 * Created by madlord on 16/1/14.
 */
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var STATIC_SRC = require("../f2eci")["static-src"];
var DIST_PATH = require('../f2eci').dist;
var HTML_PATH = require('../f2eci').output;
var CortexRecombinerPlugin = require('cortex-recombiner-webpack-plugin');
var relativeToRootPath = "..";
const env = require("../f2eci").env;
const WebpackShellPlugin = require('webpack-shell-plugin');


module.exports = {
    entry: {
        "index": ['./src/pages/index/boot-loader.jsx'],
        "common": ['@cortex/hippo', 'react', 'react-dom']//将经常用的库js包打到commons.js中,此js中的内容不会经常变动
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, relativeToRootPath, DIST_PATH, STATIC_SRC),
        publicPath: './' + STATIC_SRC + '/',
        //publicPath:'/op-task/dist/static/',
        chunkFilename: '[name].[chunkhash].js',
        sourceMapFilename: '[name].map'
    },
    cache: true,
    devtool: 'source-map',
    resolve: {
        alias: {"@lib": path.resolve(__dirname, relativeToRootPath, "./src/lib")}
    },
    module: {
        loaders: [{
            test: /\.(es6|jsx|js)$/,
            loader: 'babel',
            exclude: /node_modules/,
            query: {
                presets: ['react', 'stage-0', 'es2015'],
                plugins: ["transform-object-rest-spread", "transform-object-assign"]
            }
        }, {
            test: /\.css$/,
            loader: env == "dev" ? "style!css?-restructuring!postcss" : ExtractTextPlugin.extract('css?-restructuring!postcss')
        }, {
            test: /\.css\.module/,
            loader: env == "dev" ? "style!css?-restructuring&modules&localIdentName=[local]___[hash:base64:5]!postcss" : ExtractTextPlugin.extract('css?-restructuring&modules&localIdentName=[local]___[hash:base64:5]!postcss')
            // },{
            //     test: /\.svg$/,
            //     loader: "url-loader?limit=10000&mimetype=image/svg+xml"
        }, {
            test: /\.woff|ttf|woff2|eot$/,
            loader: 'url?limit=100000'
        }, {
            test: /\.less$/,
            loader: env == "dev" ? "style!css!postcss!less" : ExtractTextPlugin.extract('css!postcss!less')
        }, {
            test: /\.less\.module/,
            loader: env == "dev" ? "style!css?modules&localIdentName=[local]___[hash:base64:5]!postcss!less" : ExtractTextPlugin.extract('css?modules&localIdentName=[local]___[hash:base64:5]!postcss!less')
            // }, {
            //     test: /\.(png|jpg)$/,
            //     loader: 'url?limit=25000'
        }, {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: ['url?limit=25000'],
            // loaders: env == "dev" ? ["url?limit=25000"] : [
            //     'url?limit=25000',
            //     'image-webpack?progressive&optimizationLevel=3&interlaced=false'
            // ]
        }]
    },
    postcss: function () {
        //处理css兼容性代码，无须再写-webkit之类的浏览器前缀
        return [
            require('postcss-initial')({
                reset: 'all' // reset only inherited rules
            }),
            require('autoprefixer')({
                browsers: ['> 5%']
            })];
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            filename: "common.js",
            minChunks: Infinity//当项目中引用次数超过2次的包自动打入commons.js中,可自行根据需要进行调整优化

        }),
        new ExtractTextPlugin("[name].css", {
            disable: env == "dev",
            allChunks: true
        }),
        new CortexRecombinerPlugin({
            base: path.resolve(__dirname, relativeToRootPath),
        }),
        new webpack.WatchIgnorePlugin([path.resolve(__dirname, relativeToRootPath, "./node_modules/@cortex")]),
        new WebpackShellPlugin({onBuildStart: ['gulp']})

    ],
    devServer: {
        contentBase: HTML_PATH,
        historyApiFallback: false,
        hot: true,
        port: 8088,
        publicPath: '/' + STATIC_SRC + '/',
        noInfo: false
    },
};
