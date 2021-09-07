import { lazy } from "react";
// import AuthRoutes from "./AuthRoutes";

//Lazy loading and code splitting

const Brands = lazy(() => import("../views/brands/BrandsListing"));
const Brand = lazy(() => import("../views/brands/brand"));

var ThemeRoutes = [  
  {
    path: "/brands",
    name: "Brands",
    icon: "home",
    component: Brands,
  },
  {
    path: "/brand/:id",
    name: "Brands",
    icon: "home",
    component: Brand,
  },
  {
    path: "/",
    pathTo: "/brands",
    name: "Brands",
    redirect: true,
  },
];
export default ThemeRoutes;
