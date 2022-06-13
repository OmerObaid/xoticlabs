import { lazy } from "react";
// import AuthRoutes from "./AuthRoutes";

//Lazy loading and code splitting

const Brands = lazy(() => import("../views/brands/BrandsListing"));
const Brand = lazy(() => import("../views/brands/brand"));
const EditBrand = lazy(() => import("../views/brands/editBrand"));
const CreateProject = lazy(() => import("../views/project/createProject"));
const EditProject = lazy(() => import("../views/project/editProject"));
const DuplicateProject = lazy(() =>
  import("../views/project/duplicateProject")
);
const ProjectDetail = lazy(() => import("../views/project/projectDetail"));
const UserProfile = lazy(() => import("../views/user/userProfile"));
const CompanyProfile = lazy(() => import("../views/company/companyProfile"));

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
    path: "/editBrand/:id",
    name: "Brands",
    icon: "home",
    component: EditBrand,
  },
  {
    path: "/createProject",
    name: "createProject",
    icon: "home",
    component: CreateProject,
  },
  {
    path: "/editProject/:id",
    name: "editProject",
    icon: "home",
    component: EditProject,
  },
  {
    path: "/duplicateProject/:id",
    name: "duplicateProject",
    icon: "home",
    component: DuplicateProject,
  },
  {
    path: "/projectDetail/:id",
    name: "projectDetail",
    icon: "home",
    component: ProjectDetail,
  },
  {
    path: "/user",
    name: "userProfile",
    icon: "home",
    component: UserProfile,
  },
  {
    path: "/company",
    name: "companyProfile",
    icon: "home",
    component: CompanyProfile,
  },
  {
    path: "/",
    pathTo: "/brands",
    name: "Brands",
    redirect: true,
  },
];
export default ThemeRoutes;
