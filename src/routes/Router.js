import { lazy } from "react";
// import AuthRoutes from "./AuthRoutes";

//Lazy loading and code splitting

const Brands = lazy(() => import("../views/brands/BrandsListing"));
const Brand = lazy(() => import("../views/brands/brand"));
const CreateProject = lazy(() => import("../views/project/createProject"));
const EditProject = lazy(() => import("../views/project/editProject"));

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
    path: "/createProject",
    name: "project",
    icon: "home",
    component: CreateProject,
  },
  {
    path: "/editProject/:id",
    name: "project",
    icon: "home",
    component: EditProject,
  },
  {
    path: "/",
    pathTo: "/brands",
    name: "Brands",
    redirect: true,
  },
];
export default ThemeRoutes;
