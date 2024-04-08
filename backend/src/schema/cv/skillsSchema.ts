import { Schema } from "mongoose";
import { z } from "zod";


export const ZSkills = z.object({
  skill: z.string(),
  perfection: z.string(),
  });
  
  type SkillsType = z.infer<typeof ZSkills>;
  
  export interface ISkills extends SkillsType {}

export interface ISkills {
    skill: string;
    perfection: string;
  }

  
export const skillsSchema = new Schema<ISkills>({
    skill: { type: String},
    perfection: { type: String },
  });