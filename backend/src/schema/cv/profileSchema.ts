import { Schema } from "mongoose";
import { IBasic, ZBasic, basicSchema } from "./basicSchema";
import { IExperience, ZExperience, experienceSchema } from "./experienceSchema";
import { IEducation, ZEducation, educationSchema } from "./educationSchema";
import { IProjects, ZProjects, projectsSchema } from "./projectsSchema";
import { ISkills, ZSkills, skillsSchema } from "./skillsSchema";
import { ISocials, ZSocials, socialsSchema } from "./socialsSchema";
import { z } from "zod";

export const ZProfile = z.object({
  basic: ZBasic,
  education: z.array(ZEducation),
  experience: z.array(ZExperience),
  projects: z.array(ZProjects),
  skills: z.array(ZSkills),
  socials: z.array(ZSocials),
});

type ProfileType = z.infer<typeof ZProfile>;

export interface IProfile extends ProfileType {}

export interface IProfile {
  basic: IBasic;
  education: IEducation[];
  experience: IExperience[];
  projects: IProjects[];
  skills: ISkills[];
  socials: ISocials[];
}

export const profileSchema = new Schema<IProfile>({
  basic: basicSchema,
  education: [educationSchema],
  experience: [experienceSchema],
  projects: [projectsSchema],
  skills: [skillsSchema],
  socials: [socialsSchema],
});
