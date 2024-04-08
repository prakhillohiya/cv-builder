import { Icon } from "@iconify/react";
import { Box, IconButton, TextField } from "@mui/material";
import React from "react";
import {
  Control,
  Controller,
  useFieldArray,
  useFormContext
} from "react-hook-form";
import { z } from "zod";
import { ICV } from "../shared/components/CV";

export const ZEducationSchema = z.object({
  degree: z.string().min(1),
  institution: z.string().min(1),
  percentage: z.string().min(1),
});

type EducationType = z.infer<typeof ZEducationSchema>;

export interface IEducation extends EducationType {}

export interface IEducation {
  degree: string;
  institution: string;
  percentage: string;
}

const Education: React.FC<{control:Control<ICV>}> = ({ control }) => {
  const { formState,getFieldState } = useFormContext();
  const { fields, append, remove } = useFieldArray<ICV>({
    control,
    name: "profile.education",
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
          <div key={field.id} className="w-full flex items-center flex-col">
            {index !== 0 && fields.length > 1 && (
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
              name={`profile.education[${index}].degree` as any}
              render={({
                field: { onChange, onBlur, value, ref },
              }) => (
                <TextField
                inputRef={ref}
                error={!!getFieldState(`profile.education[${index}].degree`).error?.message}
                helperText={getFieldState(`profile.education[${index}].degree`).error?.message}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value || ""}
                  id="outlined-degree-input"
                  label="Degree"
                  type="text"
                  sx={{ margin: "1rem",width:"100%" }}
                />
              )}
            />

            <Controller
              control={control}
              name={`profile.education[${index}].institution` as any}
              render={({
                field: { onChange, onBlur, value, ref },
                formState: { errors },
              }) => (
                <TextField
                inputRef={ref}
                error={!!getFieldState(`profile.education[${index}].institution`).error?.message}
                helperText={getFieldState(`profile.education[${index}].institution`).error?.message}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value || ""}
                  id="outlined-institution-input"
                  label="Institution"
                  type="text"
                  sx={{ margin: "1rem",width:"100%"  }}
                />
              )}
            />

            <Controller
              control={control}
              name={`profile.education[${index}].percentage` as any}
              render={({
                field: { onChange, onBlur, value, ref },
                formState: { errors },
              }) => (
                <TextField
                inputRef={ref}
                error={!!getFieldState(`profile.education[${index}].percentage`).error?.message}
                helperText={getFieldState(`profile.education[${index}].percentage`).error?.message}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value || ""}
                  id="outlined-percentage-input"
                  label="Percentage"
                  type="text"
                  sx={{ margin: "1rem",width:"100%" }}
                />
              )}
            />
            <div>
              {index === fields.length - 1 && (
                <>
                  <IconButton
                    aria-label="add"
                    size="large"
                    onClick={() =>
                      append({
                        degree: "",
                        institution: "",
                        percentage: "",
                      })
                    }
                  >
                    <Icon icon="zondicons:add-outline" />
                  </IconButton>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default Education;
