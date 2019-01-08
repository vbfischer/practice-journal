import { User, IUser } from "models/user";
import { PassportLocalModel } from "mongoose";
const LocalStrategy = require("passport-local").Strategy;

const init = (passport: any) => {
  passport.use(
    new LocalStrategy((User as PassportLocalModel<IUser>).authenticate())
  );
  passport.serializeUser((User as PassportLocalModel<IUser>).serializeUser());

  passport.deserializeUser(
    (User as PassportLocalModel<IUser>).deserializeUser()
  );
};

export default init;
