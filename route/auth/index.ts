import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import login from "./login";
import register from "./register";
const authRouter = express.Router();

authRouter.get("/", (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
        if (err) {
          res.status(401).json({ message: "Invalid Token" });
        } else {
          res.status(200).json({ message: "Token is valid" });
        }
      });
    } else {
      res.status(400).json({ message: "No token provided" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "No token provided" });
  }
});

authRouter.post(
  "/login",
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 8 }),
  login
);

authRouter.post(
  "/register",
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 8 }),
  body("fullName").isLength({ min: 5 }),
  register
);

export default authRouter;
