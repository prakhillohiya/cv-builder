import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../utils/jwt";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    
    const {jwt} = req.cookies;


    if (!jwt) {
      return res
        .status(401)
        .send({ message: "Auth Token Not Provided", status: 401 });
    }

    const user = verifyToken(jwt) as JwtPayload;

    if (!user) {
      return res.status(401).send({ message: "Session Expired", status: 401 });
    }

    req.body.reqUser = user;
    next();
  } catch (error:any) {
    return res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
