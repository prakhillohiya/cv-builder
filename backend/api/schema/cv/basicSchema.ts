import { Schema } from "mongoose";
import { z } from "zod";

export const ZBasic = z.object({
  avatar: z.string(),
  name: z.string(),
  profession: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
  city: z.string(),
  pincode: z.string(),
  intro: z.string(),
});

type BasicType = z.infer<typeof ZBasic>;

export interface IBasic extends BasicType {}

export interface IBasic {
  avatar: string;
  name: string;
  profession: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  intro: string;
}

export const basicSchema = new Schema<IBasic>({
  avatar: { type: String },
  name: { type: String },
  profession: { type: String },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  city: { type: String },
  pincode: { type: String },
  intro: { type: String },
});
