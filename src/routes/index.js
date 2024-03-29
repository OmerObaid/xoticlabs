import { lazy } from "react";
const BlankLayout = lazy(() => import("../layouts/BlankLayout.js"));
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));
var indexRoutes = [
  // { path: "/Login", name: "Login", component: BlankLayout },
  { path: "/authentication", name: "Authentication", component: BlankLayout },
  { path: "/comments", name: "Annotation", component: BlankLayout },
  { path: "/", name: "Brands", component: FullLayout },
];

export default indexRoutes;
