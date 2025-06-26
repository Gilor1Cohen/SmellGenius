import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";
import Profile from "../pages/Profile/Profile";
import ToolOne from "../pages/ToolOne/ToolOne";
import ToolTwo from "../pages/ToolTwo/ToolTwo";
import PerfumeInformationPage from "../pages/PerfumeInformationPage/PerfumeInformationPage";

export default function Authorized() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Shop" element={<Shop />} />
      <Route path="/Profile" element={<Profile />} />

      <Route path="/next-scent" element={<ToolOne />} />
      <Route path="/scent-for-the-moment" element={<ToolTwo />} />
      <Route path="/Perfumes/:name" element={<PerfumeInformationPage />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
