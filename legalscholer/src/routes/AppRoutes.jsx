import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "@pages/LandingPage";
import PricingPage from "@pages/PricingPage";
import LoginPage from "@pages/LoginPage";
import SignupPage from "@pages/SignupPage";
import NotFound from "@pages/NotFound";


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
