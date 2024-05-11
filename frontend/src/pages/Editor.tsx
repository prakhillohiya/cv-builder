import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React, { useContext, useEffect, useState } from "react";
import {
  Controller,
  FieldErrors,
  FormProvider,
  useForm,
} from "react-hook-form";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import CVTemplate from "../CVTemplate/CVTemplate";
import {
  useCustomMutationClient,
  useCustomQueryClient,
} from "../config/queryClient";
import { ICV, ZCVSchema } from "../shared/components/CV";
import Form from "../shared/components/Form";
import { StoreContext } from "../shared/context/StoreProvider";

const Editor: React.FC = () => {
  const { defaultCV } = useContext(StoreContext);

  const [cv, setCV] = useState<ICV>(defaultCV);
  const navigate = useNavigate();
  const location = useLocation();
  const { fetchUrl, postUrl, query } = location.state || {};

  const { setError } = useContext(StoreContext);

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

  // useEffect(() => {
  //   if (queryData?.data.data) {
  //     setCV(queryData?.data.data);
  //   }
  // }, [queryData]);

  useEffect(() => {
    if (mutateData?.data.data) {
      setCV(mutateData.data.data);
    }
  }, [mutateData, queryData]);

  useEffect(() => {
    if (!queryLoading && querySuccess && fetchUrl.length) {
      const cv = queryData.data.data;
      formMethods.reset({ ...cv, profile: cv.profile });

      setCV(cv)
    }
  }, [queryLoading, querySuccess, queryData, formMethods]);

  // useEffect(() => {
  //   if (queryError && !queryLoading) {
  //     setError(queryError);
  //   }
  // }, [queryError]);

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
                  render={({ field: { onChange, onBlur, value, ref } }) => (
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
