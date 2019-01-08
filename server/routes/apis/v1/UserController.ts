import express, { Router } from "express";
import { User, IUser } from "models/user";

const router = express.Router();

router.get("/:id", ({ params }, res) => {
  const { id } = params;
  User.findById(id).then(
    (user: IUser | null) => {
      if (!user) {
        res.sendStatus(404);
        return;
      }
      res.json(user);
    },
    (err: any) => {
      res.sendStatus(500);
    }
  );
});

export const UserController: Router = router;
