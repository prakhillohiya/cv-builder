import { Schema } from "mongoose";
import { z } from "zod";

export const ZProjects = z.object({
  title: z.string(),
  teamSize: z.string(),
  duration: z.string(),
  technologies: z.string(),
  description: z.string(),
});

type ProjectsType = z.infer<typeof ZProjects>;

export interface IProjects extends ProjectsType {}

export interface IProjects {
  title: string;
  teamSize: string;
  duration: string;
  technologies: string;
  description: string;
}

export const projectsSchema = new Schema<IProjects>({
  title: { type: String },
  teamSize: { type: String },
  duration: { type: String },
  technologies: { type: String },
  description: { type: String },
});
