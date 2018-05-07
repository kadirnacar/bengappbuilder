import * as jwt from 'jwt-simple';
import * as passwordJwt from 'passport-jwt';
let JwtStrategy = passwordJwt.Strategy;
let ExtractJwt = passwordJwt.ExtractJwt;

import { Config } from './config';

module.exports = function (passport) {
  let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: Config.key,
  };
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    // var originIndex = -1;
    // var keyIndex = -1;
    // if (jwt_payload.origin) {
    //   originIndex = Config.origins.findIndex((item) => item == jwt_payload.origin);
    // }
    // if (jwt_payload.key) {
    //   keyIndex = Config.keys.findIndex((item) => item == jwt_payload.key);
    // }
    // if (originIndex > -1 || keyIndex > -1)
    //   done(null, jwt_payload);
    // else
    //   done(null, false);
    done(null, jwt_payload);
  }));
};
