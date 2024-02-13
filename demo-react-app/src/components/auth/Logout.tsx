import React, { useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import AccountDS from "../../data_services/AccountDS";

function Logout(): React.JSX.Element {
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    AccountDS.logout();
    navigate("/");
  });

  return <></>;
}

export default Logout;
