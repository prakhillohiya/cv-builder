import React, { ReactNode, createContext } from "react";
import { z } from "zod";
import { IBasic, ZBasicSchema } from "../../CVTemplate/Basic";
import { IEducation, ZEducationSchema } from "../../CVTemplate/Education";
import { IExperience, ZExperienceSchema } from "../../CVTemplate/Experience";
import { IProjects, ZProjectsSchema } from "../../CVTemplate/Projects";
import { ISkills, ZSkillsSchema } from "../../CVTemplate/Skills";
import { ISocials, ZSocialsSchema } from "../../CVTemplate/Socials";
import { ICV } from "../components/CV";

export const ZProfileSchema = z.object({
  basic: ZBasicSchema,
  education: z.array(ZEducationSchema),
  experience: z.array(ZExperienceSchema),
  projects: z.array(ZProjectsSchema),
  skills: z.array(ZSkillsSchema),
  socials: z.array(ZSocialsSchema),
});

type ProfileType = z.infer<typeof ZProfileSchema>;

export interface IProfile extends ProfileType {}

export interface IProfile {
  basic: IBasic;
  education: IEducation[];
  experience: IExperience[];
  projects: IProjects[];
  skills: ISkills[];
  socials: ISocials[];
}

export const ZTemplateSchema = z.object({
  backgroundColor: z.string(),
  fontFamily: z.string(),
  fontSize: z.string(),
});

type ITemplateType = z.infer<typeof ZTemplateSchema>;

export interface ITemplate extends ITemplateType {}

export interface ITemplate {
  backgroundColor: string;
  fontSize: string;
  fontFamily: string;
}

interface IStoreProvider {
  defaultCV: ICV;
}

export const StoreContext = createContext<IStoreProvider>({
  defaultCV: {
    _id: "1",
    template: { backgroundColor: "", fontFamily: "", fontSize: "" },
    profile: {
      basic: {
        avatar: "",
        name: "",
        profession: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        pincode: "",
        intro: "",
      },
      education: [
        {
          degree: "",
          institution: "",
          percentage: "",
        },
      ],
      experience: [
        {
          orgName: "",
          joiningLocation: "",
          position: "",
          ctc: "",
          technologies: "",
          startDate: "",
          endDate: "",
        },
      ],
      projects: [
        {
          title: "",
          teamSize: "",
          duration: "",
          technologies: "",
          description: "",
        },
      ],
      skills: [
        {
          skill: "",
          perfection: "",
        },
      ],
      socials: [
        {
          platform: "",
          profileLink: "",
        },
      ],
    },
    title: "",
  },
});

const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const defaultCV = {
    _id: "",
    profile: {
      basic: {
        avatar: "",
        name: "",
        profession: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        pincode: "",
        intro: "",
      },
      education: [
        {
          degree: "",
          institution: "",
          percentage: "",
        },
      ],
      experience: [
        {
          orgName: "",
          joiningLocation: "",
          position: "",
          ctc: "",
          technologies: "",
          startDate: "",
          endDate: "",
        },
      ],
      projects: [
        {
          title: "",
          teamSize: "",
          duration: "",
          technologies: "",
          description: "",
        },
      ],
      skills: [
        {
          skill: "",
          perfection: "",
        },
      ],
      socials: [
        {
          platform: "",
          profileLink: "",
        },
      ],
    },
    template: { backgroundColor: "", fontFamily: "", fontSize: "" },
    title: "",
  };

  return (
    <StoreContext.Provider value={{ defaultCV }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
