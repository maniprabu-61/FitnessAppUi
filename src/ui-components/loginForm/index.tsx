import React, { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextareaAutosize,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  Grid2 as Grid,
} from "@mui/material";
import { REGISTRATION_CONST } from "../registerationForm/constants";
import { validateEmail } from "../../utils/common";
import Notification from "../snackbar";
import { useNavigate } from "react-router-dom";

const steps = ["Email", "OTP Verification"];

const LoginForm = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    const isEmailValid = validateEmail(formData.email);

    if (formData.email === "") {
      setSnackbar({
        open: true,
        message: REGISTRATION_CONST.errorMessages.emptyEmail,
        severity: "error",
      });
      return;
    } else if (!isEmailValid) {
      setSnackbar({
        open: true,
        message: REGISTRATION_CONST.errorMessages.validEmail,
        severity: "error",
      });
      return;
    }

    setActiveStep((prev) => prev + 1);
  };
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    if (activeStep === 1 && formData.otp === "") {
      setSnackbar({
        open: true,
        message: REGISTRATION_CONST.errorMessages.emptyOtp,
        severity: "error",
      });
      return;
    }

    setSnackbar({
      open: true,
      message: REGISTRATION_CONST.successMessages.login,
      severity: "success",
    });
    setTimeout(() => {
      navigate("/user");
    }, 1000);
  };
  
  return (
    <Box
      sx={{
        p: 4,
        maxWidth: 600,
        margin: "20px 0px 40px",
        mx: "auto",
        border: "1px solid #ccc",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Notification
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        setSnackbar={setSnackbar}
      />
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          textAlign: "center",
          margin: "20px 0px",
          color: "#1976d2",
          fontWeight: 600,
        }}
      >
        Login
      </Typography>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <Grid container spacing={2}>
          <Grid size={12}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ textAlign: "left", marginTop: "50px" }}
            >
              Enter Email
            </Typography>
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>
          <Grid size={12} sx={{ textAlign: "right" }}>
            <Button variant="contained" color="primary" onClick={handleNext}>
              Next
            </Button>
          </Grid>
        </Grid>
      )}

      {activeStep === 1 && (
        <Grid container spacing={2}>
          <Grid size={12}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ textAlign: "left", marginTop: "50px" }}
            >
              OTP Verification
            </Typography>
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label="OTP"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>
          <Grid
            size={12}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button variant="outlined" onClick={handleBack} sx={{ mr: 2 }}>
              Back
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Login
            </Button>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default LoginForm;
