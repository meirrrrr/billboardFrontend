import TopBar from "./pages/admin/global/TopBar";
import { Route, Routes, useLocation } from "react-router-dom";
import Forms from "./pages/admin/manager/Forms";
import Managers from "./pages/admin/managers/Managers";
import { SideBar } from "./pages/admin/global/SideBar";
import Products from "./pages/admin/products/Products";
import Login from "./pages/admin/auth/Login";
import React from "react";

function App() {
  const location = useLocation();
  const noSideBarAndTopBarRoutes = ["/login"]; // Добавьте сюда любые другие маршруты, если они есть
  const showSideBarAndTopBar = !noSideBarAndTopBarRoutes.includes(
    location.pathname
  );

  return (
    <div className="app">
      {showSideBarAndTopBar && <SideBar />}
      <main className={showSideBarAndTopBar ? "content" : "full-page"}>
        {showSideBarAndTopBar && <TopBar />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin/managers"
            element={
              <ProtectedLayout>
                <Managers />
              </ProtectedLayout>
            }
          />
          <Route
            path="/admin/managers/create"
            element={
              <ProtectedLayout>
                <Forms />
              </ProtectedLayout>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedLayout>
                <Products />
              </ProtectedLayout>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

function ProtectedLayout({ children }) {
  return <React.Fragment>{children}</React.Fragment>;
}

export default App;
