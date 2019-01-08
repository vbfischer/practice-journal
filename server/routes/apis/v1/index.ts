import express, { Router } from "express";
import passport from "passport";

import { AuthController } from "./AuthController";
import { UserController } from "./UserController";

const router = express.Router();

router.use("/auth", AuthController);
router.use(
  "/users",
  passport.authenticate("jwt", { session: false }),
  UserController
);

export const V1Controller: Router = router;
