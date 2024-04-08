import { Icon } from "@iconify/react";
import { Box, IconButton, TextField } from "@mui/material";
import React from "react";
import { Control, Controller, useFieldArray, useFormContext } from "react-hook-form";
import { z } from "zod";
import { ICV } from "../shared/components/CV";

export const ZSocialsSchema = z.object({
  platform: z.string().min(1),
  profileLink: z.string().min(1),
});

type SocialsType = z.infer<typeof ZSocialsSchema>;

export interface ISocials extends SocialsType {}

export interface ISocials {
  platform: string;
  profileLink: string;
}

const Socials: React.FC<{control:Control<ICV>}> = ({ control }) => {
  const { formState,getFieldState } = useFormContext();
  const { fields, append, remove } = useFieldArray<ICV>({
    control,
    name: "profile.socials",
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
              name={`profile.socials[${index}].platform` as any}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <TextField
                inputRef={ref}
                error={!!getFieldState(`profile.socials[${index}].platform`).error?.message}
                helperText={getFieldState(`profile.socials[${index}].platform`).error?.message}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value || ""}
                  id="outlined-platform-input"
                  label="Platform"
                  type="text"
                  sx={{ margin: "1rem",width:"100%" }}
                />
              )}
            />

            <Controller
              control={control}
              name={`profile.socials[${index}].profileLink` as any}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <TextField
                inputRef={ref}
                error={!!getFieldState(`profile.socials[${index}].profileLink`).error?.message}
                helperText={getFieldState(`profile.socials[${index}].profileLink`).error?.message}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value || ""}
                  id="outlined-profileLink-input"
                  label="Profile Link"
                  type="text"
                  sx={{ margin: "1rem",width:"100%" }}
                />
              )}
            />
            <div>
            {index===fields.length-1  && (
              <IconButton
                aria-label="delete"
                size="large"
                onClick={() =>
                  append({
                    platform: "",
                    profileLink: "",
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

export default Socials;
