import { Icon } from "@iconify/react";
import { Box, IconButton, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import React from "react";
import {
  Control,
  Controller,
  useFieldArray,
  useFormContext
} from "react-hook-form";
import { z } from "zod";
import { ICV } from "../shared/components/CV";

export const ZExperienceSchema = z.object({
  orgName: z.string().min(1),
  joiningLocation: z.string().min(1),
  position: z.string().min(1),
  ctc: z.string().min(1),
  technologies: z.string().min(1),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
});

type ExperienceType = z.infer<typeof ZExperienceSchema>;

export interface IExperience extends ExperienceType {}

export interface IExperience {
  orgName: string;
  joiningLocation: string;
  position: string;
  ctc: string;
  technologies: string;
  startDate: string;
  endDate: string;
}

const Experience: React.FC<{control:Control<ICV>}> = ({ control }) => {
  const { formState, getFieldState } = useFormContext();
  const { fields, append, remove } = useFieldArray<ICV>({
    control,
    name: "profile.experience",
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
              name={`profile.experience[${index}].orgName` as any}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <TextField
                inputRef={ref}
                  error={
                    !!getFieldState(`profile.experience[${index}].orgName`).error
                      ?.message
                  }
                  helperText={
                    getFieldState(`profile.experience[${index}].orgName`).error?.message
                  }
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value || ""}
                  id="outlined-organizationName-input"
                  label="Organization Name"
                  type="text"
                  sx={{ margin: "1rem",width:"100%" }}
                />
              )}
            />

            <Controller
              control={control}
              name={`profile.experience[${index}].joiningLocation` as any}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <TextField
                inputRef={ref}
                  error={
                    !!getFieldState(`profile.experience[${index}].joiningLocation`)
                      .error?.message
                  }
                  helperText={
                    getFieldState(`profile.experience[${index}].joiningLocation`).error
                      ?.message
                  }
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value || ""}
                  id="outlined-joiningLocation-input"
                  label="Joining Location"
                  type="text"
                  sx={{ margin: "1rem",width:"100%" }}
                />
              )}
            />

            <Controller
              control={control}
              name={`profile.experience[${index}].position` as any}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <TextField
                inputRef={ref}
                  error={
                    !!getFieldState(`profile.experience[${index}].position`).error
                      ?.message
                  }
                  helperText={
                    getFieldState(`profile.experience[${index}].position`).error
                      ?.message
                  }
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value || ""}
                  id="outlined-position-input"
                  label="Position"
                  type="text"
                  sx={{ margin: "1rem",width:"100%" }}
                />
              )}
            />

            <Controller
              control={control}
              name={`profile.experience[${index}].technologies` as any}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <TextField
                inputRef={ref}
                  error={
                    !!getFieldState(`profile.experience[${index}].technologies`).error
                      ?.message
                  }
                  helperText={
                    getFieldState(`profile.experience[${index}].technologies`).error
                      ?.message
                  }
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
              name={`profile.experience[${index}].ctc` as any}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <TextField
                inputRef={ref}
                  error={
                    !!getFieldState(`profile.experience[${index}].ctc`).error?.message
                  }
                  helperText={
                    getFieldState(`profile.experience[${index}].ctc`).error?.message
                  }
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value || ""}
                  id="outlined-ctc-input"
                  label="CTC"
                  type="text"
                  sx={{ margin: "1rem",width:"100%" }}
                />
              )}
            />

            <Controller
              control={control}
              name={`profile.experience[${index}].startDate` as any}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                   inputRef={ref}
                    slotProps={{
                      textField: {
                        helperText: getFieldState(
                          `profile.experience[${index}].startDate`
                        ).error?.message,
                      },
                    }}
                    format="DD/MM/YYYY"
                    label="Start Date"
                    onChange={(date) => onChange(dayjs(date).toISOString())}
                    value={dayjs(value).isValid() ? dayjs(value) : value}
                    sx={{ margin: "1rem",width:"100%" }}
                  />
                </LocalizationProvider>
              )}
            />

            <Controller
              control={control}
              name={`profile.experience[${index}].endDate` as any}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                   inputRef={ref}
                    slotProps={{
                      textField: {
                        helperText: getFieldState(
                          `profile.experience[${index}].endDate`
                        ).error?.message,
                      },
                    }}
                    format="DD/MM/YYYY"
                    label="End Date"
                    onChange={(date) => onChange(dayjs(date).toISOString())}
                    value={dayjs(value).isValid() ? dayjs(value) : value}
                    sx={{ margin: "1rem",width:"100%" }}
                  />
                </LocalizationProvider>
              )}
            />
            <div>
              {index === fields.length - 1 && (
                <IconButton
                  aria-label="add"
                  size="large"
                  onClick={() =>
                    append({
                      orgName: "",
                      joiningLocation: "",
                      position: "",
                      ctc: "",
                      technologies: "",
                      startDate: "",
                      endDate: "",
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

export default Experience;
