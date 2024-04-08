import { Model, model } from "mongoose";
import { ICV, cvSchema } from "../schema/cv/cvSchema";

export const cvModel:Model<ICV>=model<ICV>('CV',cvSchema)