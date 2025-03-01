import { AppBar, Toolbar, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <Container sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Fitness App!
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/register")}
      >
        Start Registration
      </Button>
    </Container>
  );
};

export default LandingPage;
