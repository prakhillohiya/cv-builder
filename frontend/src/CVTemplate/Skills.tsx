import { Box, IconButton, TextField } from "@mui/material";
import React from "react";
import { Control, Controller, FieldValues, useFieldArray, useForm, useFormContext } from "react-hook-form";
import { IProfile } from "../shared/context/StoreProvider";
import { Icon } from "@iconify/react";
import { z } from "zod";
import { ICV } from "../shared/components/CV";

export const ZSkillsSchema = z.object({
  skill: z.string().min(1),
  perfection: z.string().min(1),
});

type SkillsType = z.infer<typeof ZSkillsSchema>;

export interface ISkills extends SkillsType {}

export interface ISkills {
  skill: string;
  perfection: string;
}

export const Skills: React.FC<{control:Control<ICV>}> = ({ control }) => {
  const { formState,getFieldState } = useFormContext();
  const { fields, append, remove } = useFieldArray<ICV>({
    control,
    name: "profile.skills",
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
      <div className="w-full flex flex-col mt-0 p-8 bg-white rounded-md">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center flex-col">
            {index!==0 && fields.length > 1 && (
            <IconButton
                aria-label="delete"
                size="large"
                onClick={() => remove(index)}
              >
                <Icon icon="zondicons:minus-outline" />
              </IconButton>)}
            <Controller
              control={control}
              name={`profile.skills[${index}].skill` as any}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <TextField
                inputRef={ref}
                error={!!getFieldState(`profile.skills[${index}].skill`).error?.message}
                helperText={getFieldState(`profile.skills[${index}].skill`).error?.message}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value || ""}
                  id="outlined-skill-input"
                  label="Skill"
                  type="text"
                  sx={{ margin: "1rem",width:"100%" }}
                />
              )}
            />

            <Controller
              control={control}
              name={`profile.skills[${index}].perfection` as any}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <TextField
                inputRef={ref}
                error={!!getFieldState(`profile.skills[${index}].perfection`).error?.message}
                helperText={getFieldState(`profile.skills[${index}].perfection`).error?.message}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value || ""}
                  id="outlined-perfection-input"
                  label="Perfection"
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
                    skill: "",
                    perfection: "",
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
