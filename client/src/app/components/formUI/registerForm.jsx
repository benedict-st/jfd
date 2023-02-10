import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputFieldControll from "../shared/inputFieldControl";
import Button from "../ui/button";
import "../../style/forma.css";
import { NavLink } from "react-router-dom";
import { controlledFormSchemaReg } from "../../utils/validator";
import { useDispatch, useSelector } from "react-redux";
import { getAuthErrors, signUp } from "../../store/users";
export default function RegisterForm() {
    const [passwordType, setPasswordType] = useState("password");
    const loginError = useSelector(getAuthErrors());
    const dispatch = useDispatch();
    const {
        handleSubmit,
        formState: { isValid },
        reset,
        control
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(controlledFormSchemaReg)
    });
    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text");
            return;
        }
        setPasswordType("password");
    };
    const onFormSubmit = async (formData) => {
        <NavLink to="/" />;
        dispatch(signUp({ payload: formData }));

        reset();
    };

    return (
        <>
            <section>
                <div className="container">
                    <form onSubmit={handleSubmit(onFormSubmit)}>
                        <InputFieldControll
                            control={control}
                            labelTitle="e-mail"
                            name="email"
                            type="text"
                        />
                        <label className="">Пароль</label>
                        <div className="flex-container-group">
                            <div className="item">
                                <InputFieldControll
                                    control={control}
                                    name="password"
                                    type={passwordType}
                                />
                            </div>
                            <div>
                                <button
                                    className="btn btn-outline-primary"
                                    onClick={togglePassword}
                                    type="button"
                                >
                                    {passwordType === "password" ? (
                                        <i className="bi bi-eye-slash"></i>
                                    ) : (
                                        <i className="bi bi-eye"></i>
                                    )}
                                </button>
                            </div>
                        </div>

                        <InputFieldControll
                            control={control}
                            labelTitle="Телефон (формат без 8)"
                            name="phone"
                            type="text"
                        />

                        <InputFieldControll
                            control={control}
                            labelTitle="Ваша фамилия, имя, отчество"
                            name="fio"
                            type="text"
                        />
                        <InputFieldControll
                            control={control}
                            labelTitle="Адрес для доставки"
                            name="address"
                            type="text"
                        />
                        {loginError && (
                            <p className="text-danger">{loginError}</p>
                        )}
                        <Button
                            type="submit"
                            className="submit_btn primary-btn"
                            disabled={!isValid}
                        >
                            Регистрация
                        </Button>
                    </form>
                </div>
            </section>
        </>
    );
}
