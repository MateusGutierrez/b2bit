import { Route, Routes } from "react-router-dom";
import { SignInPage } from "./pages/signIn";
import { Profile } from "./pages/profile";

export const MainRoutes = () => {
   return (
      <Routes>
         <Route path="/" element={<SignInPage />} />
         <Route path="/profile" element={<Profile />} />
      </Routes>
   );
};