import * as bodyParer from "body-parser";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import * as path from "path";

import express from "express";
import "./db";
import wordRouter from "./words";

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config() {
    this.app.use(morgan("common"));
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(bodyParer.json());
    this.app.use(bodyParer.urlencoded({ extended: true }));
    this.app.use(compression());
    this.app.set("views", path.join(__dirname, "./public"));
    this.app.set("view engine", "pug");
  }

  private routes() {
    this.app.get("/", (_, res) => {
      res.render("index", { message: "THIS IS THE ROOT" });
    });

    this.app.use("/api/words", wordRouter);
  }
}

export default new Server().app;
