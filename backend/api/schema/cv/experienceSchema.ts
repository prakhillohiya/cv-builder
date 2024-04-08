import { Schema } from "mongoose";
import { z } from "zod";

export const ZExperience = z.object({
  orgName: z.string(),
  joiningLocation: z.string(),
  position: z.string(),
  ctc: z.string(),
  technologies: z.string(),
  startDate: z.string(),
  endDate: z.string(),
});

type ExperienceType = z.infer<typeof ZExperience>;

export interface IExperience extends ExperienceType {}

export interface IExperience {
  orgName: string;
  joiningLocation: string;
  position: string;
  ctc: string;
  technologies: string;
  startDate: string;
  endDate: string;
}

export const experienceSchema = new Schema<IExperience>({
  orgName: { type: String },
  joiningLocation: { type: String },
  position: { type: String },
  ctc: { type: String },
  technologies: { type: String },
  startDate: { type: String },
  endDate: { type: String },
});
