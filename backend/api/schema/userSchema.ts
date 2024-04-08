import { Schema, Types } from "mongoose";
import { z } from "zod";

export const ZUser = z.object({
  _id: z.string().optional(),
  userName: z.string(),
  email: z.string(),
  password: z.string(),
  number: z.string().optional(),
});

type UserType = z.infer<typeof ZUser>;

export interface IUser extends UserType {}

export const ZLogin = z.object({
  userNameOrEmail: z.string(),
  password: z.string(),
});

export type LoginType = z.infer<typeof ZLogin>;

export const userSchema = new Schema<UserType>({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  number: { type: String, required: false },
});
