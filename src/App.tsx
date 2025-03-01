import React from "react";
import logo from "./logo.svg";
import "./App.css";
import RegistrationForm from "./ui-components/registerationForm";
import { Box } from "@mui/material";
import Router from "./routes";

function App() {
  return (
    <div className="App">
      <Box component={"div"} sx={{ width: "100%", height: "80vh" }}>
        <Router />
      </Box>
    </div>
  );
}

export default App;
