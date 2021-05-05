import cors from "cors";
import path from "path";
import morgan from "morgan";
import * as APIValidator from "express-openapi-validator";
import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";

import APIRouter from './endpoints';

const app = express();

// Add critical middleware
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

// Serve basic static assets
// In this case, just the standard favicon
const ico = path.join(__dirname, "logo-dark.ico");
app.use("/favicon.ico", express.static(ico));


// Turn on spec-driven validation for HTTP requests
// Erring requests will not get to the controllers.
// Raises a 4xx that is relayed to the client by the catch-all error handler
// const apiSpec = path.join(__dirname, "spec/platform.v1.yaml");
// app.use(
//   APIValidator.middleware({ apiSpec })
// );

// Mount controllers
const APIVersion = process.env.API_VERSION;
app.use(`/${APIVersion}`, APIRouter);


// Catch-all error handler
const catchAllErrors: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err.status, req.path, err.message);
  res.status(err.status || 500).json({
    message: err.message,
  });
};
app.use(catchAllErrors);

export default app;
