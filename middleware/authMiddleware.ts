import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.headers.authorization === undefined)
      throw new Error("No authorization header");

    const token = req.headers.authorization.split(" ")[1];

    if (!jwt.verify(token, process.env.JWT_SECRET as string)) {
      throw new Error("Invalid token");
    }

    next();
  } catch (err) {
    console.log("authMiddleware", err);
    res.status(401).send("Unauthorized");
  }
};

export default authMiddleware;
