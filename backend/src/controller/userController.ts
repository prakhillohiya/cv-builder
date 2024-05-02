import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { IExtendedRequest } from "../interface";
import { userModel } from "../model/userModel";
import { ICV } from "../schema/cv/cvSchema";
import { IUser } from "../schema/userSchema";
import { createToken } from "../utils/jwt";

export const createUser = async (
  req: Request<IExtendedRequest<IUser>>,
  res: Response
) => {
  try {
    const { userName, email, password, number } = req.body;

    const existingUser = await userModel.findOne<ICV>({
      $or: [{ userName: userName }, { email: email }],
    });

    if (existingUser) {
      return res
        .status(400)
        .send({ message: "User already registered", statusCode: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await new userModel<IUser>({
      ...req.body,
      password: hashedPassword,
    }).save();

    return res.status(200).send({
      message: "User Registered Successfully",
      data: user,
    });
  } catch (error: any) {
    return res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const login = async (
  req: Request<IExtendedRequest<IUser>>,
  res: Response
) => {
  try {
    const { userNameOrEmail, password } = req.body;

    const existingUser = await userModel.findOne<IUser>({
      $or: [{ userName: userNameOrEmail }, { email: userNameOrEmail }],
    });

    if (!existingUser) {
      return res
        .status(400)
        .send({ message: "User Not Found", statusCode: 400 });
    }

    const isPasswordMatched = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordMatched) {
      return res
        .status(400)
        .send({ message: "Incorrect Password", statusCode: 400 });
    }

    const token = createToken({
      userId: existingUser._id,
      userName: existingUser.userName,
      email: existingUser.email,
      number: existingUser.number,
    });

    res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000,secure:true,sameSite: "none" });

    return res.status(200).send({
      message: "Login Successful",
      data: {
        email: existingUser.email,
        userName: existingUser.userName,
        number: existingUser.number,
      },
      token: token,
    });
  } catch (error: any) {
    return res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const logout = async (
  req: Request<IExtendedRequest<IUser>>,
  res: Response
) => {
  try {
    await res.clearCookie("jwt");
    await res.cookie("jwt", "", { httpOnly: true, maxAge: 3600000,secure:true,sameSite: "none" });

    return res.status(200).send({
      message: "Logout Successful",
    });
  } catch (error: any) {
    return res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
