import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "../../components/formUI/loginForm";
import RegisterForm from "../../components/formUI/registerForm";
import Breadcrumb from "../../components/pageUi/breadcrumb";

const Login = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(
        type === "register" ? type : "login"
    );
    const toggleFormType = (params) => {
        setFormType((prevState) =>
            prevState === "register" ? "login" : "register"
        );
    };

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        {formType === "register" ? (
                            <>
                                <Breadcrumb header="Регистрация" />
                                <RegisterForm />
                                <p>
                                    Already have account?{" "}
                                    <a role="button" onClick={toggleFormType}>
                                        {" "}
                                        Sign In
                                    </a>
                                </p>
                            </>
                        ) : (
                            <>
                                <Breadcrumb header="Авторизация" />
                                <section className="checkout spad">
                                    <div className="container">
                                        <div className="checkout__form">
                                            <LoginForm />
                                        </div>
                                    </div>
                                </section>
                                <p>
                                    Dont have account?{" "}
                                    <a role="button" onClick={toggleFormType}>
                                        Sign Up
                                    </a>
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
