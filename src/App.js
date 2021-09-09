import React from "react";
import indexRoutes from "./routes/";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
// import { configureStore } from "./redux/Store";
// import { store, persistor} from "./redux/Store";
import Store from "./redux/Store";

import { History } from "./jwt/_helpers";
import { PrivateRoute } from "./routes/PrivateRoutes";
import BlankLayout from "./layouts/BlankLayout";
import { PersistGate } from "redux-persist/integration/react";

const App = () => {
  return (
    // <Provider store={configureStore()}>
    <Provider store={Store.store}>
      <PersistGate loading={null} persistor={Store.persistor}>
        <Router history={History}>
          <Switch>
            <Route exact path="/authentication/Login" component={BlankLayout} />;
            {indexRoutes.map((prop, key) => {
              return (
                <PrivateRoute
                  path={prop.path}
                  key={key}
                  component={prop.component}
                />
              );
            })}
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
};
export default App;

