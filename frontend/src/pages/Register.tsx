import { Box, Button, Divider, TextField } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useCustomMutationClient } from "../config/queryClient";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Logo from "../shared/components/Logo";
import { StoreContext } from "../shared/context/StoreProvider";

export const ZRegisterSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  userName: z
    .string()
    .min(5, { message: "User Name must be at least 5 characters long" }),
  password: z
    .string()
    .min(8, {
      message:
        "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
    })
    .max(32, { message: "Password must not exceed 32 characters" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      {
        message:
          "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
      }
    ),
  number: z
    .string()
    .refine((value) => /^\d{10}$/.test(value), {
      message: "Invalid mobile number format",
    })
    .optional(),
});

type RegisterType = z.infer<typeof ZRegisterSchema>;

export interface IRegister extends RegisterType {}

export interface IRegister {
  email: string;
  userName: string;
  password: string;
  number: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm<IRegister>({
    resolver: zodResolver(ZRegisterSchema),
  });

  const {
    mutate,
    isPending: mutatePending,
    error: mutateError,
  } = useCustomMutationClient<IRegister>({
    url: "/user/register",
    method: "post",
    mutationKey: "postRegister",
    successCallback: () => {
      navigate("/login");
    },
  });

  const { setError } = useContext(StoreContext);

  useEffect(() => {
    if (mutateError && !mutatePending) {
      setError(mutateError);
    }
  }, [mutateError]);

  const handleSignupClick = (formData: IRegister) => {
    mutate(formData);
  };

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
      <form onSubmit={handleSubmit(handleSignupClick)}>
        <div className="w-[500px] flex flex-col mt-0 p-8 bg-white rounded-md shadow">
          <Controller
            control={control}
            name="userName"
            render={({
              field: { onChange, onBlur, value },
              formState: { errors },
            }) => (
              <TextField
                error={errors?.userName ? true : false}
                helperText={errors?.userName?.message?.toString()}
                onChange={onChange}
                onBlur={onBlur}
                value={value || ""}
                id="outlined-username-input"
                label="Username"
                type="text"
                sx={{ margin: "1rem" }}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({
              field: { onChange, onBlur, value },
              formState: { errors },
            }) => (
              <TextField
                error={errors?.email ? true : false}
                helperText={errors?.email?.message?.toString()}
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
            name="password"
            render={({
              field: { onChange, onBlur, value },
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

          <Controller
            control={control}
            name="number"
            render={({
              field: { onChange, onBlur, value },
              formState: { errors },
            }) => (
              <TextField
                error={errors?.number ? true : false}
                helperText={errors?.number?.message?.toString()}
                onChange={onChange}
                onBlur={onBlur}
                value={value || ""}
                id="outlined-number-input"
                label="Contact Number"
                type="text"
                sx={{ margin: "1rem" }}
              />
            )}
          />

          <Button
            variant="contained"
            type={"submit"}
            sx={{ margin: "auto", width: "50%", marginTop: "1rem" }}
          >
            Register
          </Button>

          <Divider sx={{ marginTop: "2rem", marginBottom: "2rem" }}>
            Already have an account?
          </Divider>
          <div className="flex justify-center">
            <Link to={"/login"}>
              <Button variant="contained" color="success">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </form>
    </Box>
  );
};

export default Register;
