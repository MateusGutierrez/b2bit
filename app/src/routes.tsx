import { Route, Routes } from "react-router-dom";
import { SingInPage } from "./pages/signIn";
import { Profile } from "./pages/profile";

export const MainRoutes = () => {
   return (
      <Routes>
         <Route path="/" element={<SingInPage />} />
         <Route path="/profile" element={<Profile />} />
      </Routes>
   );
};