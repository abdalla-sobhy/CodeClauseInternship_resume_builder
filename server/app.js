import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./src/routes/user.js";
import userResume from "./src/routes/resume.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/user", userRouter);
app.use("/resume", userResume);


// /api/user/

export default app;
