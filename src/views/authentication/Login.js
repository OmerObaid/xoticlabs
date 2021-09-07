import React from "react"
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link } from "react-router-dom";

import logoImage from "../../assets/images/xotic-logo.png";
import bannerImage from "../../assets/images/login-Banner.png";
import { PROJECT_NAME } from "../constants";
import { AuthenticationService } from "../../jwt/_services";

const Login = (props) => {
    return <>
        <div className="bodyClone">
            <main className="loginPage">
                <section className="loginBody">
                    <div className="loginForm">
                        <img src={logoImage} alt="logo" className="logo" />
                        <h1>Log into Xotic Labs</h1>
                        <Formik

                            initialValues={{
                                email: "client@xoticlabs.com",
                                password: "123",
                            }}
                            validationSchema={Yup.object().shape({
                                email: Yup.string().required("Email is required"),
                                password: Yup.string().required("Password is required"),
                            })}
                            onSubmit={(
                                { email, password },
                                { setStatus, setSubmitting }
                            ) => {
                                setStatus();
                                AuthenticationService.login(email, password).then(
                                    (user) => {
                                        const { from } = props.location.state || {
                                            from: { pathname: "/" },
                                        };
                                        props.history.push(from);

                                    },
                                    (error) => {
                                        // console.log(error);
                                        setSubmitting(false);
                                        setStatus(error);
                                    }
                                );
                            }}

                            render={({ errors, status, touched, isSubmitting }) => (
                                <Form>

                                    {status && (
                                        <div className={"alert alert-danger"}>{status}</div>
                                    )}

                                    <div className="inputFields">
                                        <div className="label">
                                            <label htmlFor="email">Email address</label>
                                        </div>
                                        <Field name="email" id="email" type="text" placeholder="Email" />
                                        <ErrorMessage
                                            name="email"
                                            component="div"
                                            className="invalid-feedback"
                                        />
                                    </div>
                                    <div className="inputFields">
                                        <div className="label">
                                            <label htmlFor="password">Password</label>
                                            <a href="#">Forgot your password?</a>
                                        </div>
                                        <Field name="password" id="password" type="password" placeholder="Password" />
                                        <ErrorMessage
                                            name="password"
                                            component="div"
                                            className="invalid-feedback"
                                        />
                                    </div>
                                    <button type="submit" disabled={isSubmitting}>LOG IN</button>
                                    <p className="ct-signUp">Don’t have an account yet? <Link to={`/Signup`}>Sign Up</Link></p>

                                </Form>
                            )}
                        />
                        <p className="copyright">Copyright © {new Date().getFullYear()} {PROJECT_NAME}</p>
                    </div>
                    <img src={bannerImage} alt="logo" className="bg-img" />
                </section>
            </main>
        </div>
    </>
}

export default Login
