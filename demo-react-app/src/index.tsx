import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter } from "react-router-dom";
// import reportWebVitals from './reportWebVitals';

import "./assets/css/index.css";

import App from "./components/App";
import AppContainer from "./components/app/AppContainer";
import Dashboard from "./components/app/Dashboard";
import CategoryView from "./components/app/CategoryView";
import ProtectedRoutes from "./components/app/ProtectedRoutes";
import FavoriteProductView from "./components/app/FavoriteProductView";
import ProductEdit from "./components/app/ProductEdit";
import AuthContainer from "./components/auth/AuthContainer";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Logout from "./components/auth/Logout";
import NotFound from "./components/app/NotFound";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<AppContainer />}>
            <Route path="" element={<Dashboard />} />
            <Route path="category/:id" element={<CategoryView />} />
            <Route path="" element={<ProtectedRoutes />}>
              <Route
                path="favorite-products"
                element={<FavoriteProductView />}
              />
              <Route path="product/edit/:id" element={<ProductEdit />} />
            </Route>
          </Route>
          <Route path="" element={<AuthContainer />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
        </Route>
        <Route path="logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
