import cors from "cors";
import path from "path";
import morgan from "morgan";
import { PrismaClient } from "@prisma/client";
import * as APIValidator from "express-openapi-validator";
import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";

const app = express();
const prisma = new PrismaClient();
const APIVersion = process.env.API_VERSION;

// Add critical middleware
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

// Serve basic static assets
// In this case, just the standard favicon
// and the API specification
const apiSpec = path.join(__dirname, "oas.yaml");
// app.use(`/${APIVersion}/spec`, express.static(apiSpec));

const ico = path.join(__dirname, "logo-dark.ico");
app.use("/favicon.ico", express.static(ico));

// app.use(
//   APIValidator.middleware({
//     apiSpec,
//     validateRequests: true
//   })
// );

app.get("/members", async (req, res) => {
  const members = await prisma.memberships.findMany();
  res.json({ members });
});

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
