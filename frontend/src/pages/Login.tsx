import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, LinearProgress, TextField } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import {
  useCustomMutationClient
} from "../config/queryClient";
import Logo from "../shared/components/Logo";

export const ZLoginSchema = z.object({
  userNameOrEmail: z.string(),
  password: z.string(),
});

type LoginType = z.infer<typeof ZLoginSchema>;

export interface ILogin extends LoginType {}

// export interface ILogin {
//   userNameOrEmail: string;
//   password: string;
// }

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm<ILogin>({
    resolver: zodResolver(ZLoginSchema),
  });

  const { mutate, isPending, error, isSuccess } =
    useCustomMutationClient<ILogin>({
      url: "/user/login",
      method: "post",
      mutationKey: "postLogin",
      successCallback: () => {
        navigate("/app/dashboard");
      },
    });

  if (isPending) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  }

  const handleLoginSubmit = async (formData: ILogin) => {
    await mutate(formData);
  };

  if (isPending) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#eaeaea",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Logo />
      <form onSubmit={handleSubmit(handleLoginSubmit)}>
        <div className="w-[500px] flex flex-col mt-0 p-8 bg-white rounded-md shadow">
          <Controller
            control={control}
            name="userNameOrEmail"
            render={({
              field: { onChange, onBlur, value, ref },
              formState: { errors },
            }) => (
              <TextField
                error={errors?.userNameOrEmail ? true : false}
                helperText={errors?.userNameOrEmail?.message?.toString()}
                onChange={onChange}
                onBlur={onBlur}
                value={value || ""}
                id="outlined-username-input"
                label="Username/Email"
                type="text"
                sx={{ margin: "1rem" }}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({
              field: { onChange, onBlur, value, ref },
              formState: { errors },
            }) => (
              <TextField
                error={errors?.password ? true : false}
                helperText={errors?.password?.message?.toString()}
                onChange={onChange}
                onBlur={onBlur}
                value={value || ""}
                id="outlined-password-input"
                label="Password"
                type="password"
                sx={{ margin: "1rem" }}
              />
            )}
          />

          <Button
            variant="contained"
            type="submit"
            sx={{ margin: "auto", width: "50%", marginTop: "1rem" }}
          >
            Login
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default Login;
