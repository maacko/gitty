var HTMLWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
    entry: './app/index.js',
    module: {
        rules: [
            {test:/\.js$/, exclude: /node_modules/, loader:'babel-loader'},
            {test:/\.css$/, loader:['style-loader', 'css-loader']}
        ]
    },
    output: {
        /*This gives us the full path to the director dist
         * The result is the same as if we did __dirname + '/dist'*/
        path: path.resolve(__dirname, './dist'),
        filename: 'index_bundle.js'
    },
    devServer: {
        historyApiFallback: true
    },
    plugins: [new HTMLWebpackPlugin({
        /* The same applies here. This gives us the full path to index.html in
         * app*/
        template: path.resolve(__dirname, './app/index.html'),
        filename: 'index.html',
        inject: 'body'
    })]
};
