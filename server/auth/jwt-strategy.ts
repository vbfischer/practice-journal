import { Strategy, ExtractJwt } from "passport-jwt";
import jwt from "jsonwebtoken";

import User from "../models/user";

const init = (passport: any) => {
  const jwtLogin = new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
      secretOrKey: process.env.JWT_SECRET
    },
    (jwt_payload, done) => {
      User.findById(jwt_payload._id).then(
        user => {
          if (user) {
            done(null, user);
          } else {
            done(null, false);
          }
        },
        err => {
          return done(err, false);
        }
      );
    }
  );

  passport.use(jwtLogin);
};

export const generateToken = (user: any) =>
  jwt.sign(user, process.env.JWT_SECRET as string, {
    expiresIn: 10080
  });

export default init;
