import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { isAccountCanceled, isAccountSuspended } from "../helper/accountHelper";
import { AuthenticationService } from "../jwt/_services";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const headerSettings = useSelector((state) => state.headerSettings);
  return (
    <Route
      {...rest}
      render={(props) => {
        const currentUser = AuthenticationService.currentUserValue;
        let goingTo = window.location.href.split("/").pop();
        if (!currentUser) {
          // not logged in so redirect to login page with the return url
          return (
            <Redirect
              to={{
                pathname: "/authentication/Login",
                state: { from: props.location },
              }}
            />
          );
        }

        if (
          (isAccountCanceled(headerSettings) ||
            isAccountSuspended(headerSettings)) &&
          goingTo != "user" &&
          goingTo != "company"
        ) {
          return (
            <Redirect
              to={{
                pathname: "/company",
                state: { from: props.location },
              }}
            />
          );
        }

        // authorised so return component
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
