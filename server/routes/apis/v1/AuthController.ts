import express, { Router, Response, Request } from "express";
import passport from "passport";
import { PassportLocalModel } from "mongoose";

import { User, IUser, UserInfo } from "models/user";
import { generateToken } from "auth/jwt-strategy";

const router: Router = express.Router();

router.post("/register", (req: Request, res: Response) => {
  (User as PassportLocalModel<IUser>).register(
    new User({ username: req.body.username, active: true }),
    req.body.password,
    (err: any, user: IUser | null) => {
      if (err || !user) {
        res.status(404).json(err);
        return;
      }

      res.status(200).json({
        success: true
      });
    }
  );
});

router.post(
  "/login",
  passport.authenticate("local"),
  (req: Request, res: Response) => {
    const user: IUser = req.user;

    const userInfo: UserInfo = {
      _id: user._id,
      username: user.username,
      active: user.active
    };

    res.status(200).json({
      token: "JWT " + generateToken(userInfo),
      user: req.user
    });
  }
);

export const AuthController: Router = router;
