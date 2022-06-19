import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import { userModel } from "../../model/user";

const register = async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      email,
      password,
    }: { fullName: string; email: string; password: string } = req.body;

    // handle error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const oldUser = await userModel.findOne({ email });
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const socketId = await bcrypt.hash(email, 10);
    const user = await userModel.create({
      fullName: fullName,
      email: email,
      password: encryptedPassword,
      socketId: socketId,
    });

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        socketId: user.socketId,
        fullName: user.fullName,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: process.env.JWT_EXPIRES as string,
      }
    );

    res.status(201).json({ token: token });
  } catch (err) {
    console.log(err);
  }
};
export default register;
