import express from "express";
import { APIController } from "./apis";

const init = (server: express.Application) => {
  server.use("/api", APIController);
};

export default {
  init
};
