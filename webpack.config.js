var path = require('path');
module.exports = {
    devtool: 'source-map',
    entry: ['./src/app'],
    output: {
        path: path.resolve('./dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: [ '.ts', '.tsx'],
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loaders: ['ts-loader']
            }
        ]
    }
};