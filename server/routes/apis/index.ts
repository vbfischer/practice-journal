import express, { Router } from "express";
import { V1Controller } from "./v1";

const router: Router = express.Router();

router.use("/v1", V1Controller);

export const APIController: Router = router;
