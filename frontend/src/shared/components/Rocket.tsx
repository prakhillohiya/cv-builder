import React, { useContext, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Typography } from "@mui/material";
import axios from "axios";
import {
  useCustomMutationClient,
  useCustomQueryClient,
} from "../../config/queryClient";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreProvider";

const Rocket: React.FC = () => {
  const navigate = useNavigate();
  const { setError } = useContext(StoreContext);

  const {
    mutate,
    isPending: mutatePending,
    error: mutateError,
    data: mutateData,
    isSuccess: mutateSuccess,
  } = useCustomMutationClient({
    url: `https://api.render.com/v1/services/${
      import.meta.env.VITE_RENDER_SERVICE_ID
    }/restart`,
    method: "post",
    mutationKey: "restartServer",
    successCallback: () => {
      setError(null);
      navigate("/app/dashboard");
    },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_RENDER_API_KEY}`,
      // "Access-Control-Allow-Origin": "*",
      // " Access-Control-Allow-Credentials": "true",
      // 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
      // "mode":"no-cors"
    },
  });

  useEffect(() => {
    mutate("");
  }, []);

  return (
    <div>
      <DotLottieReact
        src="https://lottie.host/914d7bab-82ad-47da-aaa0-4222b6a46e63/u4sV3fxi6W.json"
        loop
        autoplay
        style={{ height: "80vh", width: "100vw" }}
      />
      <Typography variant="h4" sx={{ textAlign: "center", padding: "2rem" }}>
        Warming up Server. Hang on for a minute
      </Typography>
    </div>
  );
};

export default Rocket;
