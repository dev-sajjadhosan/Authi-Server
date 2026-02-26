import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { indexRouter } from "./routes";
import { env } from "./config/env";
import status from "http-status";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", toNodeHandler(auth));
app.use("/api/v1", indexRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(status.OK).json({
    name: "Authi",
    version: "v1",
    api: "/api/v1",
    description: "Authi is a authentication server.",
    localUrl: `http://localhost:${env.PORT}`,
    liveUrl: env.PRODUCTION_URL,
    mode: process.env.NODE_ENV || "development",
  });
});

export default app;
