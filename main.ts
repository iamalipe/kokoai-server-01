import "dotenv/config";
import express, { Request, Response } from "express";
import database from "./config/database";
import authMiddleware from "./middleware/authMiddleware";
import authRouter from "./route/auth";
import productRouter from "./route/product";

const EXPRESS_PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
database().connect();

app.get("/", (req: Request, res: Response) =>
  res.send(`🟢[${process.env.SNAME}]`)
);

app.use("/auth", authRouter);
app.use("/product", authMiddleware, productRouter);

app.listen(EXPRESS_PORT, () => {
  console.log(`🟢[${process.env.SNAME}] is running on port ${EXPRESS_PORT}.`);
});
