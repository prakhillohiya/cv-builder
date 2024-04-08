import React from "react";
import {
  useFormContext
} from "react-hook-form";
import Basic from "../../CVTemplate/Basic";
import Education from "../../CVTemplate/Education";
import Experience from "../../CVTemplate/Experience";
import Projects from "../../CVTemplate/Projects";
import { Skills } from "../../CVTemplate/Skills";
import Socials from "../../CVTemplate/Socials";
import { ICV } from "./CV";
import ScrollableTabs from "./ScrollableTabs";


const Form: React.FC = () => {
  const { control } = useFormContext<ICV>();
  return (
    <>
      <ScrollableTabs
        tabs={[
          { label: "Basic", panel: <Basic control={control} /> },
          { label: "Education", panel: <Education control={control} /> },
          { label: "Experience", panel: <Experience control={control} /> },
          { label: "Projects", panel: <Projects control={control} /> },
          { label: "Skills", panel: <Skills control={control} /> },
          { label: "Socials", panel: <Socials control={control} /> },
        ]}
      />
    </>
  );
};

export default Form;
