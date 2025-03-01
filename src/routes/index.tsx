import {
  BrowserRouter as BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from "../ui-components/NavBar";
import LandingPage from "../views/landingPage";
import RegistrationForm from "../ui-components/registerationForm";
import NotFoundPage from "../views/404";
import LoginForm from "../ui-components/loginForm";
import UserLandingPage from "../views/userLandingPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/user" element={<UserLandingPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
