import { AppBar, Toolbar, Button, Typography, Container } from "@mui/material";
import YouTubePlayer from "../../ui-components/youtubePlayer";

const UserLandingPage = () => {
  return (
    <Container sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h3" gutterBottom>
        User landing page
      </Typography>

      <YouTubePlayer url="https://www.youtube.com/watch?v=enYITYwvPAQ" />
    </Container>
  );
};

export default UserLandingPage;
