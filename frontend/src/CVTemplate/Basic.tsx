import {
  Avatar,
  Box,
  Button,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import React, { ChangeEvent, useContext } from "react";
import { IProfile, StoreContext } from "../shared/context/StoreProvider";
import { Control, Controller, FieldValues, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { ErrorMessage } from "@hookform/error-message";
import { ICV } from "../shared/components/CV";

export const ZBasicSchema = z.object({
  avatar: z.string().optional(),
  name: z.string().min(1),
  profession: z.string().min(1),
  email: z.string().email({ message: "Invalid email format" }),
  phone: z.string().refine((value) => /^\d{10}$/.test(value), {
    message: "Invalid mobile number format",
  }),
  address: z.string().min(1),
  city: z.string().min(1),
  pincode: z
    .string()
    .min(6, { message: "Pincode Must be of 6 Digits" })
    .max(6, { message: "Pincode Must be of 6 Digits" }),
  intro: z.string().min(1),
});

type BasicType = z.infer<typeof ZBasicSchema>;

export interface IBasic extends BasicType {}



const Basic: React.FC<{control:Control<ICV>}> = ({ control }) => {
  const { getFieldState } = useFormContext();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#eaeaea",
        overflow: "auto",
      }}
    >
      <div className="w-full flex flex-col mt-0 p-8 bg-white rounded-md overflow-auto h-[100%]">
        <Controller
          control={control}
          name="profile.basic.avatar"
          render={({
            field: { onChange, onBlur, value, ref },
            formState: { errors },
          }) => (
            <>
              <label
                htmlFor="avatar-upload"
                className="ml-auto mr-auto w-[100px]"
              >
                <Avatar
                  alt="Avatar"
                  src={value}
                  className="ml-auto mr-auto hover:cursor-pointer"
                  sx={{
                    "&.MuiAvatar-root": {
                      width: "100px",
                      height: "100px",
                    },
                  }}
                />
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                style={{ display: "none", width: "100px" }}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files ? e.target.files[0] : null;
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      if (!event.target) {
                        return;
                      }
                      onChange(event.target.result);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </>
          )}
        />

        <Controller
          control={control}
          name="profile.basic.name"
          render={({
            field: { onChange, onBlur, value, ref },
            formState: { errors, isValid },
          }) => (
            <TextField
              inputRef={ref}
              onChange={onChange}
              error={!!getFieldState("profile.basic.name").error?.message}
              helperText={getFieldState("profile.basic.name").error?.message}
              onBlur={onBlur}
              value={value || ""}
              id="outlined-name-input"
              label="Name"
              type="text"
              sx={{ margin: "1rem" }}
            />
          )}
        />

        <Controller
          control={control}
          name="profile.basic.profession"
          render={({
            field: { onChange, onBlur, value, ref },
            formState: { errors, isValid },
          }) => (
            <TextField
            inputRef={ref}
              error={!!getFieldState("profile.basic.profession").error?.message}
              helperText={getFieldState("profile.basic.profession").error?.message}
              onChange={onChange}
              onBlur={onBlur}
              value={value || ""}
              id="outlined-profession-input"
              label="Profession"
              type="text"
              sx={{ margin: "1rem" }}
            />
          )}
        />

        <Controller
          control={control}
          name="profile.basic.email"
          render={({
            field: { onChange, onBlur, value, ref },
            formState: { errors, isValid },
          }) => (
            <TextField
            inputRef={ref}
              error={!!getFieldState("profile.basic.email").error?.message}
              helperText={getFieldState("profile.basic.email").error?.message}
              onChange={onChange}
              onBlur={onBlur}
              value={value || ""}
              id="outlined-email-input"
              label="Email"
              type="email"
              sx={{ margin: "1rem" }}
            />
          )}
        />

        <Controller
          control={control}
          name="profile.basic.phone"
          render={({
            field: { onChange, onBlur, value, ref },
            formState: { errors, isValid },
          }) => (
            <TextField
            inputRef={ref}
              error={!!getFieldState("profile.basic.phone").error?.message}
              helperText={getFieldState("profile.basic.phone").error?.message}
              onChange={onChange}
              onBlur={onBlur}
              value={value || ""}
              id="outlined-phone-input"
              label="Phone"
              type="text"
              sx={{ margin: "1rem" }}
            />
          )}
        />

        <Controller
          control={control}
          name="profile.basic.address"
          render={({
            field: { onChange, onBlur, value, ref },
            formState: { errors, isValid },
          }) => (
            <TextField
            inputRef={ref}
              error={!!getFieldState("profile.basic.address").error?.message}
              helperText={getFieldState("profile.basic.address").error?.message}
              onChange={onChange}
              onBlur={onBlur}
              value={value || ""}
              id="outlined-address-input"
              label="Address"
              type="text"
              sx={{ margin: "1rem" }}
            />
          )}
        />
        <Controller
          control={control}
          name="profile.basic.city"
          render={({
            field: { onChange, onBlur, value, ref },
            formState: { errors, isValid },
          }) => (
            <TextField
            inputRef={ref}
              error={!!getFieldState("profile.basic.city").error?.message}
              helperText={getFieldState("profile.basic.city").error?.message}
              onChange={onChange}
              onBlur={onBlur}
              value={value || ""}
              id="outlined-city-input"
              label="City"
              type="text"
              sx={{ margin: "1rem" }}
            />
          )}
        />

        <Controller
          control={control}
          name="profile.basic.pincode"
          render={({
            field: { onChange, onBlur, value, ref },
            formState: { errors, isValid },
          }) => (
            <TextField
            inputRef={ref}
              error={!!getFieldState("profile.basic.pincode").error?.message}
              helperText={getFieldState("profile.basic.pincode").error?.message}
              onChange={onChange}
              onBlur={onBlur}
              value={value || ""}
              id="outlined-pincode-input"
              label="Pincode"
              type="text"
              sx={{ margin: "1rem" }}
            />
          )}
        />

        <div className="p-4">
          <Controller
            control={control}
            name="profile.basic.intro"
            render={({
              field: { onChange, onBlur, value, ref },
              formState: { errors, isValid },
            }) => (
              <TextField
              inputRef={ref}
                error={!!getFieldState("profile.basic.intro").error?.message}
                helperText={getFieldState("profile.basic.intro").error?.message}
                onChange={onChange}
                onBlur={onBlur}
                value={value || ""}
                id="intro"
                className="w-full text-sm font-normal font-sans leading-normal p-3  rounded-br-none shadow-lg shadow-slate-100 dark:shadow-slate-900 focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500 dark:hover:border-purple-500 focus:border-purple-500 dark:focus:border-purple-500 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-300 focus-visible:outline-0 box-border"
                aria-label="intro"
                placeholder="Intro"
                minRows={4}
                multiline
              />
            )}
          />
        </div>
      </div>
    </Box>
  );
};

export default Basic;
