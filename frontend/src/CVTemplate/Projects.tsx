import { Icon } from "@iconify/react";
import { Box, IconButton, TextField } from "@mui/material";
import React from "react";
import { Control, Controller, useFieldArray, useFormContext } from "react-hook-form";
import { z } from "zod";
import { ICV } from "../shared/components/CV";

export const ZProjectsSchema = z.object({
  title: z.string().min(1),
  teamSize: z.string().min(1),
  duration: z.string().min(1),
  technologies: z.string().min(1),
  description: z.string().min(1),
});

type ProjectsType = z.infer<typeof ZProjectsSchema>;

export interface IProjects extends ProjectsType {}

export interface IProjects {
  title: string;
  teamSize: string;
  duration: string;
  technologies: string;
  description: string;
}

const Projects: React.FC<{control:Control<ICV>}> = ({ control }) => {
  const { formState,getFieldState } = useFormContext();
  const { fields, append, remove } = useFieldArray<ICV>({
    control,
    name: "profile.projects",
  });

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#eaeaea",
      }}
    >
      <div className="w-full flex flex-col mt-0 p-8 bg-white rounded-md ">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center flex-col">
            {index!==0 && fields.length > 1 && (
              <IconButton
                aria-label="delete"
                size="large"
                onClick={() => remove(index)}
              >
                <Icon icon="zondicons:minus-outline" />
              </IconButton>
            )}
            <Controller
              control={control}
              name={`profile.projects[${index}].title` as any}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <TextField
                inputRef={ref}
                error={!!getFieldState(`profile.projects[${index}].title`).error?.message}
                helperText={getFieldState(`profile.projects[${index}].title`).error?.message}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value || ""}
                  id="outlined-projectTitle-input"
                  label="Project Title"
                  type="text"
                  sx={{ margin: "1rem",width:"100%" }}
                />
              )}
            />

            <Controller
              control={control}
              name={`profile.projects[${index}].teamSize` as any}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <TextField
                inputRef={ref}
                error={!!getFieldState(`profile.projects[${index}].teamSize`).error?.message}
                helperText={getFieldState(`profile.projects[${index}].teamSize`).error?.message}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value || ""}
                  id="outlined-teamSize-input"
                  label="Team Size"
                  type="text"
                  sx={{ margin: "1rem",width:"100%" }}
                />
              )}
            />

            <Controller
              control={control}
              name={`profile.projects[${index}].duration` as any}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <TextField
                inputRef={ref}
                error={!!getFieldState(`profile.projects[${index}].duration`).error?.message}
                helperText={getFieldState(`profile.projects[${index}].duration`).error?.message}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value || ""}
                  id="outlined-duration-input"
                  label="Duration"
                  type="text"
                  sx={{ margin: "1rem",width:"100%" }}
                />
              )}
            />

            <Controller
              control={control}
              name={`profile.projects[${index}].technologies` as any}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <TextField
                inputRef={ref}
                error={!!getFieldState(`profile.projects[${index}].technologies`).error?.message}
                helperText={getFieldState(`profile.projects[${index}].technologies`).error?.message}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value || ""}
                  id="outlined-technologies-input"
                  label="Technologies"
                  type="text"
                  sx={{ margin: "1rem",width:"100%" }}
                />
              )}
            />

            <Controller
              control={control}
              name={`profile.projects[${index}].description` as any}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <TextField
                inputRef={ref}
                error={!!getFieldState(`profile.projects[${index}].description`).error?.message}
                helperText={getFieldState(`profile.projects[${index}].description`).error?.message}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value || ""}
                  id="outlined-description-input"
                  label="Description"
                  type="text"
                  sx={{ margin: "1rem",width:"100%" }}
                />
              )}
            />
            <div>
            {index===fields.length-1 && (
              <IconButton
                aria-label="delete"
                size="large"
                onClick={() =>
                  append({
                    title: "",
                    teamSize: "",
                    duration: "",
                    technologies: "",
                    description: "",
                  })
                }
              >
                <Icon icon="zondicons:add-outline" />
              </IconButton>
            )}

            </div>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default Projects;
