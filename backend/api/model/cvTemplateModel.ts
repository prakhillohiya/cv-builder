import { Model, model } from "mongoose";
import { ICVTemplate, cvTemplateSchema } from "../schema/cv/cvTemplateSchema";

export const cvTemplateModel:Model<ICVTemplate>=model<ICVTemplate>('CVTemplate',cvTemplateSchema)