import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputFieldControll from "../shared/inputFieldControl";
import Button from "../ui/button";
import Spinner from "../ui/spinner";
import { controlledFormSchemaEditPersona } from "../../utils/validator";
import "../../style/forma.css";
import { useDispatch, useSelector } from "react-redux";
import { getAuthErrors, updateUser, getCurrentUserId } from "../../store/users";
import { useParams, Navigate, useNavigate } from "react-router-dom";

export default function editPersonalDataForm({ data }) {
    const loginError = useSelector(getAuthErrors());
    const isLoggedIn = useSelector(getCurrentUserId());
    const dispatch = useDispatch();
    const param = useParams();
    const navigate = useNavigate();
    if (param.userId !== isLoggedIn) {
        return <Navigate to="/profile" />;
    }
    if (data !== null) {
        const onFormSubmit = async (formData) => {
            dispatch(updateUser({ payload: formData }));
            reset();
            navigate(-1);
        };
        const defaultValues = data;
        const {
            handleSubmit,
            formState: { isValid },
            reset,
            control
        } = useForm({
            mode: "onChange",
            resolver: yupResolver(controlledFormSchemaEditPersona),
            defaultValues
        });
        return (
            <>
                {data !== null ? (
                    <div className="container mt-5">
                        <div className="row">
                            <div className="col-md-8 offset-md-3 shadow p-4">
                                <section>
                                    <form onSubmit={handleSubmit(onFormSubmit)}>
                                        <InputFieldControll
                                            control={control}
                                            labelTitle="Ваше ФИО"
                                            name="fio"
                                            type="text"
                                        />
                                        <InputFieldControll
                                            control={control}
                                            labelTitle="Телефон (формат без 8)"
                                            name="phone"
                                            type="text"
                                        />
                                        <InputFieldControll
                                            control={control}
                                            labelTitle="Адрес доставки"
                                            name="address"
                                            type="text"
                                        />
                                        {loginError && (
                                            <p className="text-danger">
                                                {loginError}
                                            </p>
                                        )}
                                        <Button
                                            type="submit"
                                            className="submit_btn primary-btn"
                                            disabled={!isValid}
                                        >
                                            Изменить
                                        </Button>
                                    </form>
                                </section>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Spinner />
                )}
            </>
        );
    }
}
