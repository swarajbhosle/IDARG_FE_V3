import React from "react";
import { Outlet } from "react-router-dom";
import { isLoggedIn } from "../auth";
import { Navigate } from "react-router-dom";

const PrivateRoute = () => {
  return isLoggedIn() ? <Outlet /> : <Navigate to={"/"} />;
};

export default PrivateRoute;
