import { Schema, Types } from "mongoose";
import { IProfile, ZProfile, profileSchema } from "./profileSchema";
import { ITemplate, ZTemplate, templateSchema } from "./templateSchema";
import { z } from "zod";

const isValidObjectId = (value: string | Types.ObjectId): boolean => {
  return Types.ObjectId.isValid(value);
};

const objectIdSchema = z.custom<string | Types.ObjectId>((value) => {
  if (typeof value !== "string" || !isValidObjectId(value)) {
    throw new Error("Invalid MongoDB ObjectId");
  }
  return value;
});

export const ZCV = z.object({
  title: z.string(),
  profile: ZProfile,
  template: ZTemplate,
  userId: objectIdSchema.optional(),
});

type CVType = z.infer<typeof ZCV>;

export interface ICV extends CVType {}

export interface ICV {
  title: string;
  profile: IProfile;
  template: ITemplate;
  userId: Types.ObjectId;
}

export const cvSchema = new Schema<ICV>({
  title: { type: String, unique: true },
  profile: profileSchema,
  template: templateSchema,
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});
