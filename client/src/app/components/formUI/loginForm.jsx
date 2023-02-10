import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputFieldControll from "../shared/inputFieldControl";
import Button from "../ui/button";
import { controlledFormSchemaAuth } from "../../utils/validator";
import { NavLink } from "react-router-dom";
import "../../style/forma.css";
import { useDispatch, useSelector } from "react-redux";
import { getAuthErrors, login } from "../../store/users";
export default function LoginForm() {
    const loginError = useSelector(getAuthErrors());
    const dispatch = useDispatch();
    const {
        handleSubmit,
        formState: { isValid },
        reset,
        control
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(controlledFormSchemaAuth)
    });
    const onFormSubmit = (formData) => {
        <NavLink to="/" />;
        dispatch(login({ payload: formData }));
        reset();
    };
    return (
        <>
            <section>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <InputFieldControll
                        control={control}
                        labelTitle="login"
                        name="email"
                        type="text"
                    />
                    <InputFieldControll
                        control={control}
                        labelTitle="password"
                        name="password"
                        type="password"
                    />
                    {loginError && <p className="text-danger">{loginError}</p>}
                    <Button
                        type="submit"
                        className="submit_btn primary-btn"
                        disabled={!isValid}
                    >
                        Вход
                    </Button>
                </form>
            </section>
        </>
    );
}
