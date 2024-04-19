import TopBar from "./pages/admin/global/TopBar";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Forms from "./pages/admin/manager/Forms";
import Managers from "./pages/admin/managers/Managers";
import { SideBar } from "./pages/admin/global/SideBar";
import Products from "./pages/admin/products/Products";
import Login from "./pages/admin/auth/Login";
import React from "react";
import PrivateRoute from "./pages/admin/privateRoute/PrivateRoute";
import ProductForm from "./pages/admin/product/ProductForm";

function App() {
  const location = useLocation();
  const noSideBarAndTopBarRoutes = ["/login"];
  const showSideBarAndTopBar = !noSideBarAndTopBarRoutes.includes(
    location.pathname
  );

  return (
    <div className="app">
      {showSideBarAndTopBar && <SideBar />}
      <main className="content">
        {showSideBarAndTopBar && <TopBar />}
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/admin" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin/managers"
            element={
              <PrivateRoute>
                <Managers />
              </PrivateRoute>
            }
          />
          <Route path="/admin/managers/create" element={<Forms />} />
          <Route path="/admin/products/create" element={<ProductForm />} />
          <Route
            path="/admin/products"
            element={
              <PrivateRoute>
                <Products />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
