import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import VerifyAccount from "./components/VerifyAccount";
import UserAccountPage from "./pages/UserAccountPage";
import CategoryPage from "./pages/CategoryPage";
import ShopDetailPage from "./pages/ShopDetailPage";
import CartBar from "./components/CartBar";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/verification" element={<VerifyAccount />} />
        <Route path="/account/profile" element={<UserAccountPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/shop/:id" element={<ShopDetailPage />} />
      </Routes>
    </>
  );
}

export default App;
