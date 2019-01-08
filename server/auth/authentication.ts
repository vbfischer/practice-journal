import passport from "passport";
import express from "express";
import localStrategy from "./local-strategy";
import jwtStrategy from "./jwt-strategy";

const init = (server: express.Application) => {
  server.use(passport.initialize());

  localStrategy(passport);
  jwtStrategy(passport);
};

export default {
  init
};
