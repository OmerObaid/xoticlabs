import { lazy } from "react";
// import AuthRoutes from "./AuthRoutes";

//Lazy loading and code splitting

const Brands = lazy(() => import("../views/brands/BrandsListing"));

var ThemeRoutes = [  
  {
    path: "/brands",
    name: "Brands",
    icon: "home",
    component: Brands,
  },
  {
    path: "/",
    pathTo: "/brands",
    name: "Brands",
    redirect: true,
  },
];
export default ThemeRoutes;
