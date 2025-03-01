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
  Alert,
} from "@mui/material";
import { REGISTRATION_CONST } from "./constants";
import Notification from "../snackbar";
import { validateEmail } from "../../utils/common";
import { useNavigate } from "react-router-dom";

const steps = [
  "Email",
  "OTP Confirmation",
  "Complete Information",
  "Congratulations",
];

const RegistrationForm = () => {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    weight: "",
    height: "",
    medicalHistory: "",
    photo: null,
    PreviewUrl: "",
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

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      const preview = URL.createObjectURL(file);
      setFormData({ ...formData, photo: file, PreviewUrl: preview });
    } else {
      alert("Only PNG and JPG files are allowed.");
    }
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
    } else if (activeStep === 1 && formData.otp === "") {
      setSnackbar({
        open: true,
        message: REGISTRATION_CONST.errorMessages.emptyOtp,
        severity: "error",
      });
      return;
    } else if (
      activeStep === 2 &&
      (formData.weight === "" ||
        formData.height === "" ||
        formData.medicalHistory === "" ||
        formData.photo === null)
    ) {
      setSnackbar({
        open: true,
        message: REGISTRATION_CONST.errorMessages.requierd,
        severity: "error",
      });
      return;
    }
    setActiveStep((prev) => prev + 1);
  };
  console.log("activeStep", activeStep, formData);

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    handleNext();
  };
  console.log("formdata", formData);

  return (
    <Box
      sx={{
        p: 4,
        maxWidth: 600,
        margin: "20px",
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
          margin: "20px 0px 40px",
          color: "#1976d2",
          fontWeight: 600,
        }}
      >
        Registration
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
              OTP Confirmation
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
            <Button variant="contained" color="primary" onClick={handleNext}>
              Next
            </Button>
          </Grid>
        </Grid>
      )}
      {activeStep === 2 && (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ textAlign: "left", marginTop: "50px" }}
              >
                Complete Your Information
              </Typography>
            </Grid>
            <Grid size={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Weight</InputLabel>
                <Select
                  name="weight"
                  label="Weight"
                  value={formData.weight}
                  onChange={handleChange}
                >
                  <MenuItem value="">Select Weight</MenuItem>
                  <MenuItem value="50">50kg</MenuItem>
                  <MenuItem value="60">60kg</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Height</InputLabel>
                <Select
                  name="height"
                  label="Height"
                  value={formData.height}
                  onChange={handleChange}
                >
                  <MenuItem value="">Select Height</MenuItem>
                  <MenuItem value="150">150cm</MenuItem>
                  <MenuItem value="160">160cm</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={12}>
              <TextareaAutosize
                name="medicalHistory"
                placeholder="Enter your medical history"
                value={formData.medicalHistory}
                onChange={handleChange}
                style={{
                  width: "100%",
                  height: 100,
                  marginBottom: 20,
                  borderRadius: "5px",
                }}
              />
            </Grid>
            <Grid
              size={12}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button
                variant="contained"
                component="label"
                sx={{ height: "35px" }}
              >
                Upload Photograph
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  hidden
                  onChange={handleFileChange}
                />
              </Button>

              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
      {activeStep === 3 && (
        <Grid container spacing={2}>
          <Grid size={12}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ textAlign: "center", marginTop: "50px", color: "green" }}
            >
              Congratulations!
            </Typography>
            <Typography variant="body1" gutterBottom>
              Your registration form has been submitted successfully...!
            </Typography>

            <Grid size={12} display={"flex"}>
              <Grid size={6}>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ fontWeight: 600, textAlign: "left" }}
                >
                  Email:{" "}
                  <Box component={"span"} sx={{ fontWeight: 400 }}>
                    {formData.email}
                  </Box>
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ fontWeight: 600, textAlign: "left" }}
                >
                  Height:{" "}
                  <Box component={"span"} sx={{ fontWeight: 400 }}>
                    {formData.height}
                  </Box>
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ fontWeight: 600, textAlign: "left" }}
                >
                  Weight:{" "}
                  <Box component={"span"} sx={{ fontWeight: 400 }}>
                    {formData.weight}
                  </Box>
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ fontWeight: 600, textAlign: "left" }}
                >
                  Medical history:{" "}
                  <Box component={"span"} sx={{ fontWeight: 400 }}>
                    {formData.medicalHistory}
                  </Box>
                </Typography>
              </Grid>
              <Grid size={6}>
                <img
                  style={{
                    height: "-webkit-fill-available",
                    width: "-webkit-fill-available",
                  }}
                  src={formData.PreviewUrl}
                  alt="profile"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginTop: "20px" }}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </Grid>{" "}
        </Grid>
      )}
    </Box>
  );
};

export default RegistrationForm;
