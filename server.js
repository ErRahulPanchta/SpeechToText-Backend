import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDb from "./config/db.js";
import userRouter from "./routes/user.routes.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import audioRouter from "./routes/audio.routes.js";

const app = express();
app.use(cors({
  credentials: true,
  origin: process.env.FRONTEND_URL
}));

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet({
  crossOriginResourcePolicy: false
}));


app.get("/", (req, res) => {
  res.json("Api is running");
});

app.use("/user", userRouter);
app.use("/audio", audioRouter);

const PORT = process.env.PORT;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})

