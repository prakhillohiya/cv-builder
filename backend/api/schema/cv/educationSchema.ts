import { Schema } from "mongoose";
import { z } from "zod";

export const ZEducation = z.object({
  degree: z.string(),
  institution: z.string(),
  percentage: z.string(),
});

type EducationType = z.infer<typeof ZEducation>;

export interface IEducation extends EducationType {}

export interface IEducation {
  degree: string;
  institution: string;
  percentage: string;
}

export const educationSchema = new Schema<IEducation>({
  degree: { type: String },
  institution: { type: String },
  percentage: { type: String },
});
