import React from "react";
import "./styles/App.css";
import { BrowserRouter } from "react-router";
import Navbar from "./components/UI/Navbar/Navbar";
// import AppRouter from "./components/UI/AppRouter";
import { Route, Routes, Navigate } from "react-router";
import CreateProduct from "./pages/CreateProduct";
import Products from "./pages/Products";
import PostPage from "./pages/PostPage";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      {/* <AppRouter /> */}
      <Routes>
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<PostPage />} />
        <Route path="*" element={<Navigate to="/products" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
