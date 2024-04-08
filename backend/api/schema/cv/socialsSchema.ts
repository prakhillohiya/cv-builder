import { Schema } from "mongoose";
import { z } from "zod";

export const ZSocials = z.object({
  platform: z.string(),
  profileLink: z.string(),
});

type SocialsType = z.infer<typeof ZSocials>;

export interface ISocials extends SocialsType {}

export interface ISocials {
  platform: string;
  profileLink: string;
}

export const socialsSchema = new Schema<ISocials>({
  platform: { type: String },
  profileLink: { type: String },
});
