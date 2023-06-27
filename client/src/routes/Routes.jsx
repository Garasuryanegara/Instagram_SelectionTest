import { Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ProfilePage from "../pages/ProfilePage";
import ChangePasswordPage from "../pages/ChangePasswordPage";
import VerificationPage from "../pages/VerificationPage";
import ProtectedPage from "./ProtectedPage";
import VerificationBox from "../components/verificationBox";

const routes = [
  <Route
    path="/login"
    element={
      <ProtectedPage guestOnly={true}>
        <LoginPage />
      </ProtectedPage>
    }
  ></Route>,
  <Route
    path="/register"
    element={
      <ProtectedPage guestOnly={true}>
        <RegisterPage />
      </ProtectedPage>
    }
  ></Route>,
  <Route
    path="/home"
    element={
      <ProtectedPage needLogin={true}>
        <HomePage />
      </ProtectedPage>
    }
  ></Route>,
  <Route
    path="/forgot-password"
    element={
      <ProtectedPage guestOnly={true}>
        <ForgotPasswordPage />
      </ProtectedPage>
    }
  ></Route>,
  <Route
    path="/profile"
    element={
      <ProtectedPage needLogin={true}>
        <ProfilePage />
      </ProtectedPage>
    }
  ></Route>,
  <Route
    path="/change-password/:token"
    element={
      <ProtectedPage guestOnly={true}>
        <ChangePasswordPage />
      </ProtectedPage>
    }
  ></Route>,
  <Route
    path="/verification-email/:token"
    element={
      // <ProtectedPage guestOnly={true}>
      <VerificationPage />
      // </ProtectedPage>
    }
  ></Route>,
  <Route path="/verif" element={<VerificationBox />}></Route>,
];

export default routes;
