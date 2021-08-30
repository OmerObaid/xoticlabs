import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import Spinner from "./views/spinner/Spinner";
import "./assets/css/styles.css";
import "./assets/css/dev/dev.css"
import reportWebVitals from './reportWebVitals';


const App = lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(import("./App")), 0);
    })
);

ReactDOM.render(
  <Suspense fallback={<Spinner />}>
    <App />
  </Suspense>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
