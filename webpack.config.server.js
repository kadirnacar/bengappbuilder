const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);
    const isBundle = env && env.bundle;
    const clientBundleOutputDir = './dist';

    const config = {
        target: 'node',
        devtool: isDevBuild ? 'source-map' : 'hidden-source-map',
        mode: isDevBuild ? 'development' : 'production',
        externals: [
            /^[a-z\-0-9]+$/ // Ignore node_modules folder
        ],
        node: {
            __dirname: false
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            modules: [
                'node_modules'
            ]
        },
        entry: {
            'main': ['./server/index.ts']
        },
        module: {
            rules: [{
                test: /\.tsx?$/,
                include: [/server/],
                exclude: /node_modules/,
                use: [
                    // 'ts-loader'
                    'awesome-typescript-loader?silent=true'
                ]
            }]
        },
        output: {
            path: path.resolve(".", 'dist'),
            publicPath: "/",
            filename: '[name].js',
            libraryTarget: "commonjs"
        },
        // optimization: {
        //     minimizer: [
        //         isDevBuild ? null : new UglifyJSPlugin({
        //             uglifyOptions: {
        //                 beautify: false,
        //                 compress: true,
        //                 comments: false,
        //                 mangle: false,
        //                 toplevel: false,
        //                 keep_classnames: true, // <-- doesn't exist, I guess. It's in harmony branch
        //                 keep_fnames: true //
        //             }
        //         })
        //     ]
        // },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': isDevBuild ? '"development"' : '"production"'
            })
        ]
    };

    return config;
};