import { Box, Button, Paper, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Form from "../shared/components/Form";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import {
  IProfile,
  StoreContext,
  ZProfileSchema,
} from "../shared/context/StoreProvider";
import {
  Control,
  Controller,
  ControllerFieldState,
  FieldError,
  FieldErrors,
  FieldValues,
  FormProvider,
  UseFormGetFieldState,
  useForm,
} from "react-hook-form";
import CVTemplate from "../CVTemplate/CVTemplate";
import {
  useCustomMutationClient,
  useCustomQueryClient,
} from "../config/queryClient";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ICV, ZCVSchema } from "../shared/components/CV";
import { ZBasicSchema } from "../CVTemplate/Basic";
import { convertValueToMeridiem } from "@mui/x-date-pickers/internals/utils/time-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { useDialog } from "../shared/context/DialogProvider";

const Editor: React.FC = () => {
  const { defaultCV } = useContext(StoreContext);

  const [cv, setCV] = useState<ICV>(defaultCV);
  const navigate = useNavigate();
  const location = useLocation();
  const { fetchUrl, postUrl, query } = location.state || {};

  const {
    isLoading: queryLoading,
    error: queryError,
    data: queryData,
    isSuccess: querySuccess,
  } = useCustomQueryClient<ICV>({
    url: fetchUrl,
    method: "get",
    queryKey: "getUserCV",
    enabled: query,
  });

  const formMethods = useForm<ICV>({
    defaultValues: defaultCV,
    resolver: zodResolver(ZCVSchema),
  });

  const {
    mutate,
    isPending: mutatePending,
    error: mutateError,
    isSuccess: mutateSuccess,
    data: mutateData,
  } = useCustomMutationClient<ICV>({
    url: postUrl,
    method: "post",
    mutationKey: "postEditor",
    successCallback: () => {
      // navigate("/app/dashboard");
    },
  });

  useEffect(() => {
    if (!fetchUrl || !postUrl || !query) {
      navigate("/app/dashboard");
    }
  }, [fetchUrl, postUrl, query]);

  useEffect(() => {
    if (queryData?.data.data) {
      setCV(queryData?.data.data);
    }
  }, [queryData]);

  useEffect(() => {
    if (mutateData?.data.data) {
      setCV(mutateData.data.data);
    }
  }, [mutateData, queryData]);

  useEffect(() => {
    if (!queryLoading && querySuccess && fetchUrl.length) {
      const cv = queryData.data.data;
      formMethods.reset({ ...cv, profile: cv.profile });
    }
  }, [queryLoading, querySuccess, queryData, formMethods]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (
        formMethods.formState.isDirty &&
        !formMethods.formState.isSubmitSuccessful
      ) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [formMethods.formState.isDirty, formMethods.formState.isSubmitSuccessful]);

  const handleFormSubmit = (cv: ICV) => {
    mutate(cv);
  };

  const handleInvalidFormSubmission = (error: FieldErrors) => {
    toast.error("Invalid Details. Please check all the tabs");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} margin={0}>
        <Grid xs={4}>
          <FormProvider {...formMethods}>
            <form
              onSubmit={formMethods.handleSubmit(
                (data) => handleFormSubmit(data),
                (error) => handleInvalidFormSubmission(error)
              )}
            >
              <Form />
              <div className="flex justify-center gap-8 p-4">
                <Controller
                  control={formMethods.control}
                  name="title"
                  render={({
                    field: { onChange, onBlur, value, ref },
                    formState: { errors, isValid },
                  }) => (
                    <TextField
                      inputRef={ref}
                      onChange={onChange}
                      error={
                        !!formMethods.getFieldState("title").error?.message
                      }
                      helperText={
                        formMethods.getFieldState("title").error?.message
                      }
                      onBlur={onBlur}
                      value={value || ""}
                      id="outlined-name-input"
                      label="Title"
                      type="text"
                      sx={{}}
                    />
                  )}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ margin: "auto", width: "50%", marginTop: "auto" }}
                >
                  Save
                </Button>
              </div>
            </form>
          </FormProvider>
        </Grid>
        <Grid xs={8}>
          <CVTemplate cv={cv} width="100%" showDownload={true} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Editor;
