import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { userModel } from "../../model/user";

const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: { email: string; password: string } = req.body;

    // handle error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const result = await userModel.findOne({
      email: email,
    });
    if (result) {
      if (bcrypt.compareSync(password, result.password)) {
        const token = jwt.sign(
          {
            id: result._id,
            email: result.email,
            socketId: result.socketId,
            fullName: result.fullName,
          },
          process.env.JWT_SECRET as string,
          {
            expiresIn: process.env.JWT_EXPIRES as string,
          }
        );
        return res.status(200).json({ token: token });
      }
      return res.status(401).send("Password is incorrect");
    }
    return res.status(404).send("User not found");
  } catch (err) {
    console.log(err);
  }
};
export default login;
