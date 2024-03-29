import { lazy } from "react";
// const Login2 = lazy(() => (import('../views/authentication/Login2')));
// const Register = lazy(() => (import('../views/authentication/Register')));
// const Register2 = lazy(() => (import('../views/authentication/Register2')));
// const Lockscreen = lazy(() => (import('../views/authentication/LockScreen')));
// const Recoverpwd = lazy(() => (import('../views/authentication/RecoverPwd')));
// const Maintanance = lazy(() => (import('../views/authentication/Maintanance')));
const Login = lazy(() => import("../views/authentication/Login"));
const ForgetPassword = lazy(() =>
  import("../views/authentication/ForgetPassword")
);
const ForgetPasswordEmail = lazy(() =>
  import("../views/authentication/ForgetPasswordEmail")
);

const ResetPassword = lazy(() =>
  import("../views/authentication/ResetPassword")
);
const projectImageAnnotation = lazy(() =>
  import("../views/imageAnnotations/projectImageAnnotation")
);
// const SignUp = lazy(() => (import("../views/authentication/SignUp")));

var AuthRoutes = [
  {
    path: "/authentication/Login",
    name: "Login",
    icon: "mdi mdi-account-key",
    component: Login,
  },
  {
    path: "/forget-password",
    name: "Forget Password",
    icon: "mdi mdi-account-key",
    component: ForgetPassword,
  },
  {
    path: "/forget-password-email",
    name: "Forget Password Email",
    icon: "mdi mdi-account-key",
    component: ForgetPasswordEmail,
  },
  {
    path: "/reset-password/:resetToken",
    name: "Reset Password",
    icon: "mdi mdi-account-key",
    component: ResetPassword,
  },
  {
    path: "/comments/annotation",
    name: "Annotation",
    component: projectImageAnnotation,
  },
  // { path: '/Signup', name: 'Login', icon: 'mdi mdi-account-key', component: SignUp },
  // { path: '/authentication/Signup', name: 'Singup', icon: 'mdi mdi-account-key', component: SignUp },
  // { path: '/authentication/Login2', name: 'Login with Firebase', icon: 'mdi mdi-account-key', component: Login2 },
  // { path: '/authentication/Register', name: 'Register', icon: 'mdi mdi-account-plus', component: Register },
  // { path: '/authentication/Register2', name: 'Register with Firebase', icon: 'mdi mdi-account-plus', component: Register2 },
  // { path: '/authentication/LockScreen', name: 'Lockscreen', icon: 'mdi mdi-account-off', component: Lockscreen },
  // { path: '/authentication/RecoverPwd', name: 'Recover Password', icon: 'mdi mdi-account-convert', component: Recoverpwd },
  // { path: '/authentication/Maintanance', name: 'Maintanance', icon: 'mdi mdi-pencil-box-outline', component: Maintanance }
];
export default AuthRoutes;
