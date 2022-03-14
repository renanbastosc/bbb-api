import './bootstrap'
import express from "express";
import cors from "cors";
import "express-async-errors";
import routes from "./routes";

import { ValidationError } from "yup";

import "./database";
import BaseError from "./app/exceptions/BaseError";

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (err instanceof ValidationError) {
        return res.status(400).json({ errors: err.errors });
      } else if (err instanceof BaseError) {
        return res.status(err.getCode()).json({ errors: [err.getMessage()] });
      } else {
        console.log(err)
      }

      return res.status(500).json({ errors: ["Internal server error"] });
    });
  }
}

export default new App().server;
