import { Schema, Types } from "mongoose";
import { IProfile, ZProfile, profileSchema } from "./profileSchema";
import { ITemplate, ZTemplate, templateSchema } from "./templateSchema";
import { z } from "zod";

export const ZCVTemplate = z.object({
  title: z.string(),
  profile: ZProfile,
  template: ZTemplate,
});

type CVTemplateType = z.infer<typeof ZCVTemplate>;

export interface ICVTemplate extends CVTemplateType {}

export interface ICVTemplate {
  title: string;
  profile: IProfile;
  template: ITemplate;
}

export const cvTemplateSchema = new Schema<ICVTemplate>({
  title: { type: String,unique:true },
  profile: profileSchema,
  template: templateSchema,
});
