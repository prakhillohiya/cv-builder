import React from "react";
import { PaymentElement } from "@stripe/react-stripe-js";
import { Button } from "@mui/material";

const PaymentCheckout = () => {
  return (
    <>
      <PaymentElement />
      <Button
        variant="contained"
        type="submit"
        sx={{ margin: "auto", width: "50%", marginTop: "1rem" }}
      >
        Login
      </Button>
    </>
  );
};

export default PaymentCheckout;
