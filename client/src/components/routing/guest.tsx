import { Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "../pages/AuthPage/AuthPage";
import LandingPage from "../pages/LandingPage/LandingPage";

export default function Guest() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/SignUp" element={<AuthPage />} />
      <Route path="/Login" element={<AuthPage />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
