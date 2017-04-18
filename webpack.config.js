var HTMLWebpackPlugin = require('http-webpack-plugin'); 
var path = require('path');

module.exports = {
    entry: './app/index.js',
    modules: {
        rules: [
            {test:/\.js$/ exclude:/node_modules/ loader:'babel-loader'},
            {test:/\.css$/ loader:['style-loader', 'css-loader']}
        ]
    },
    output: {
        path: path.resolve('./', '/dist'),
        filename: 'index_bundle.js'
    },
    plugins: new HTMLWebpackPlugin({
        template: path.resolve('./', '/app/index.html'),
        filename: 'index.html',
        inject: 'app'
    })
};
