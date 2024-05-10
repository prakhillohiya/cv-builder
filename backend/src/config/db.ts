import { connect } from "mongoose";

export const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URL!, {
      maxPoolSize: 10,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
    throw error;
  }
};
