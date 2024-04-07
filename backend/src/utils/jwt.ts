import jwt from "jsonwebtoken";

const createToken = (user: object) => {
  const token = jwt.sign(user, process.env.JWT_SECRET!, {
    expiresIn: "24h",
  });
  return token;
};

const verifyToken = (token: string) => {
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET!);
    if (!user) null;

    return user;
  } catch (error) {
    new Error("Invalid Token");
  }
};

export {createToken,verifyToken}
