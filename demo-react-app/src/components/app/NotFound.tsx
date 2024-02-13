import React from "react";
import { Navigate } from "react-router-dom";

function NotFound(): React.JSX.Element {
  return <Navigate to="/" />;
}

export default NotFound;
