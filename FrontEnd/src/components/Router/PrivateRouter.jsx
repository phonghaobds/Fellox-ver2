import { Navigate } from "react-router-dom";
import React, { Component } from "react";
const PrivateRoute = ({ children }) => {
  return (
    <>
      {localStorage.getItem("userToken") ? children : <Navigate to="/login" />}
    </>
  );
};

export default PrivateRoute;
