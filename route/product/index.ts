import express, { Request, Response } from "express";
const product = express.Router();

product.get("/", (req: Request, res: Response) => {
  res.send("🟢[${process.env.SNAME}] product is running");
});

export default product;
