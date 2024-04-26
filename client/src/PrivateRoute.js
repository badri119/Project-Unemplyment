import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

//get cookie and store in a variable called token or whatever you like

const PrivateRoute = ({ component: component, ...rest }) => {
  const [cookies] = useCookies(["Token"]);
  // console.log(cookies.Token);

  return (
    <div>
      {(() => {
        if (cookies.Token !== "undefined") {
          return <Outlet />;
        } else {
          return <Navigate to="/" />;
        }
      })()}
    </div>

    // Another way to write this is:
    //This basically means if token exists, navigate to outlet which are the private routes and if token is not present,
    // navigate to the home page
    //return token ? <Outlet /> : <Navigate to="/" />;
  );
};

export default PrivateRoute;
