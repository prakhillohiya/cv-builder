import { Box, LinearProgress, ThemeProvider, createTheme } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy, useContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoutes from "./shared/components/ProtectedRoutes";
import { DialogProvider } from "./shared/context/DialogProvider";
import StoreProvider, { StoreContext } from "./shared/context/StoreProvider";
import axios, { AxiosInstance } from "axios";
import Rocket from "./shared/components/Rocket";

const LazyRegister = lazy(() => import("./pages/Register"));
const LazyLogin = lazy(() => import("./pages/Login"));

const queryClient = new QueryClient();

// const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

// const STRIPE_CLIENT_SECRET = import.meta.env.VITE_STRIPE_CLIENT_SECRET;

// const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

// const options = {
//   clientSecret: STRIPE_CLIENT_SECRET,
// };

const theme = createTheme({
  typography: {
    fontFamily: [
      "Rubik",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

function App() {
  return (
    // <Elements stripe={stripePromise} options={options}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <DialogProvider>
          <StoreProvider>
            <Suspense
              fallback={
                <Box sx={{ width: "100%" }}>
                  <LinearProgress />
                </Box>
              }
            >
              <Routes>
                <Route
                  path="/"
                  element={<Navigate to="/app/dashboard" replace={true} />}
                />
                <Route path="/register" element={<LazyRegister />} />
                <Route path="/login" element={<LazyLogin />} />
                <Route path="/app/*" element={<ProtectedRoutes />} />
              </Routes>
            </Suspense>
            <Toaster />
          </StoreProvider>
        </DialogProvider>
      </ThemeProvider>
    </QueryClientProvider>
    // </Elements>
  );
}

export default App;
