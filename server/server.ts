import * as bodyParser from "body-parser";
import * as express from "express";
import { Router, Request, Response, NextFunction } from 'express';

import * as path from "path";
import corsPrefetch from 'cors-prefetch-middleware';
import * as webpack from 'webpack';
import * as passport from 'passport';
require('./config/passport')(passport);

import { Config } from "./config/config";
const webpackConfigFile = require("../webpack.config");
let webpackConfig;
let compiler;
if (process.env.HOT && process.env.HOT.trim() != 'false') {
  // webpackConfig = webpackConfigFile({ client: true, hot: process.env.HOT && process.env.HOT.trim() == 'true' });
  // compiler = webpack(webpackConfig);
}
/** Creates and configures an ExpressJS web server. */
class App {
  /** Ref to Express instance */
  public express: express.Application;

  /** Run configuration methods on the Express instance. */
  constructor() {
    this.express = express();
    this.middleware();
    this.database();
    this.routes();
  }

  /** Configure Express middleware. */
  private middleware(): void {
    if (process.env.HOT && process.env.HOT.trim() != 'false') {
      // this.express.use(
      //   require("webpack-dev-middleware")(compiler, {
      //     noInfo: false,
      //     publicPath: "/"
      //   })
      // );

      // this.express.use(require("webpack-hot-middleware")(compiler));
    }
    // Configure Cors.
    this.express.use(corsPrefetch);

    // Configure header.
    // this.express.use((req, res, next) => {
    //   res.header("Content-Type", "application/vnd.api+json");
    //   next();
    // });
    this.express.use(bodyParser.json({ limit: '50mb' }));
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  /** Database configuration. */
  database(): void {
    // mongoose
    //   .connectAsync(Config.dbUrl, {
    //     useMongoClient: true
    //   })
    //   .then(() => console.log("Connected to database"))
    //   .catch(err => console.log(err));
  }

  /** Configure API endpoints. */
  private routes(): void {
    let router = express.Router();
    this.express.use(express.static("public"));
    this.express.use(express.static("dist"));
    this.express.use(express.static("dist/uploads"));
    this.express.use(/\/((?!api).)*/, function(req, res) {
      res.sendFile('index.html', { root: path.resolve(".", "dist") }, function(err) {
        if (err) {
          res.status(500).send(err)
        }
      })
    })
    if (process.env.HOT && process.env.HOT.trim() != 'false') {

      // this.express.use("*", passport.authenticate('jwt', { session: false }), (req, res) => {
      //   return res.sendFile('index.html', { root: path.resolve(".", "dist") });
      // });
    } else {
      this.express.use("/", router);

    }
    this.express.use("/", router);
  }
}

export default new App().express;
