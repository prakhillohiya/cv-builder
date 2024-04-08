import { Schema } from "mongoose";
import { z } from "zod";

export const ZTemplate = z.object({
  backgroundColor: z.string(),
  fontSize: z.string(),
  fontFamily: z.string(),
});

type TemplateType = z.infer<typeof ZTemplate>;

export interface ITemplate extends TemplateType {}

export interface ITemplate {
  backgroundColor: string;
  fontSize: string;
  fontFamily: string;
}

export const templateSchema = new Schema<ITemplate>({
  backgroundColor: { type: String },
  fontSize: { type: String },
  fontFamily: { type: String },
});
