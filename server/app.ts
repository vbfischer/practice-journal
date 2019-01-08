import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/routes";
import authentication from "./auth";
import winston from "winston";
import expressWinston from "express-winston";

import mongoose, { Connection } from "mongoose";
import graphqlHTTP from "express-graphql";
import { buildSchema, GraphQLSchema } from "graphql";

const server: express.Application = express();


const create = (config?: any): void => {
  const schema: GraphQLSchema = buildSchema(`
    type Query {
      hello: String
    }
  `);

  const root = {
    hello: () => "Hello World"
  };

  server.set("env", "dev");
  server.set("port", 3001);
  server.set("hostname", "localhost");

  server.use(bodyParser.json());

  authentication.init(server);
  server.use(
    expressWinston.logger({
      transports: [new winston.transports.Console()],
      meta: true, // optional: control whether you want to log the meta data about the request (default to true)
      msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
      expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
      colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
      ignoreRoute: function(req, res) {
        return false;
      } // optional: allows to skip some log messages based on request and/or response
    })
  );

  mongoose.connect(
    process.env.MONGO_URI as string,
    {
      useNewUrlParser: true
    }
  );

  const conn: Connection = mongoose.connection;

  server.use(
    "/graphql",
    graphqlHTTP({
      schema,
      rootValue: root,
      graphiql: true
    })
  );
  conn.on("error", console.error.bind(console, "connection error:"));
  routes.init(server);
};

const start = (): void => {
  const hostname: string = server.get("hostname");
  const port: string = server.get("port");

  server.listen(port, () => {
    console.log(`Express server listening on - http://${hostname}:${port}`);
  });
};

export default {
  create,
  start
};
