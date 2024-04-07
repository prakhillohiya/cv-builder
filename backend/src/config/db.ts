import { Schema, model, connect } from "mongoose";

export const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URL!);
  } catch (error) {
    console.log(error);
  }
};
