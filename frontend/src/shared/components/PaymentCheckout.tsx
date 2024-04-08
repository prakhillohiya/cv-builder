import { Button } from "@mui/material";
import { PaymentElement } from "@stripe/react-stripe-js";

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
