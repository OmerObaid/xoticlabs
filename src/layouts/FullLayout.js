import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./layout-components/header/Header";
import Footer from "./layout-components/footer/Footer";
import ThemeRoutes from "../routes/Router";
import Spinner from "./../views/spinner/Spinner";

export default (props) => {
  return (
    <div className="bodyClone">
      {/*--------------------------------------------------------------------------------*/}
      {/* Header                                                                         */}
      {/*--------------------------------------------------------------------------------*/}
      <Header {...props} />
      {/*--------------------------------------------------------------------------------*/}
      {/* Sidebar                                                                        */}
      {/*--------------------------------------------------------------------------------*/}
      {/* <Sidebar {...props} routes={ThemeRoutes} /> */}
      {/*--------------------------------------------------------------------------------*/}
      {/* Page Main-Content                                                              */}
      {/*--------------------------------------------------------------------------------*/}

      <Suspense fallback={<Spinner />}>
        <Switch>
          {ThemeRoutes.map((prop, key) => {
            if (prop.navlabel) {
              return null;
            } else if (prop.collapse) {
              return prop.child.map((prop2, key2) => {
                if (prop2.collapse) {
                  return prop2.subchild.map((prop3, key3) => {
                    return (
                      <Route
                        path={prop3.path}
                        component={prop3.component}
                        name={prop3.name}
                        key={key3}
                      />
                    );
                  });
                }
                return (
                  <Route
                    path={prop2.path}
                    component={prop2.component}
                    name={prop2.name}
                    key={key2}
                  />
                );
              });
            } else if (prop.redirect) {
              return <Redirect from={prop.path} to={prop.pathTo} key={key} />;
            } else {
              return (
                <Route
                  path={prop.path}
                  component={prop.component}
                  name={prop.name}
                  key={key}
                />
              );
            }
          })}
        </Switch>
      </Suspense>
      <Footer />
    </div>
  );
};
