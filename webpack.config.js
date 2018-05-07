const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const clientConfig = require('./webpack.config.client');
const serverConfig = require('./webpack.config.server');
const adminConfig = require('./webpack.config.admin');


module.exports = (env) => {
    console.log(env);
    if (env.client)
        return clientConfig(env);
    else if (env.server)
        return serverConfig(env);
    else if (env.admin)
        return adminConfig(env);
};