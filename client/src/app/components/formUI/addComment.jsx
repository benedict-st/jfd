import React, { useState } from "react";
import TextAreaFieldControl from "../shared/textAreaFieldControl";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { controlledFormSchemaComment } from "../../utils/validator";
import { getEmailToken, getUserId } from "../../services/localStorage.service";
import Button from "../ui/button";
import "../../style/forma.css";
import PropTypes from "prop-types";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../store/comments";
import { getUsersList } from "../../store/users";
const AddCommentForm = () => {
    const [data, setData] = useState({});
    const { productId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getUsers = useSelector(getUsersList());
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const {
        handleSubmit,
        formState: { isValid },
        reset,
        control
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(controlledFormSchemaComment)
    });

    const onFormSubmit = async (formData) => {
        if (getEmailToken()) {
            const dataComment = {
                comment: formData.content,
                pageId: productId,
                created_at: Date.now(),
                user: getEmailToken(),
                userId: getUserId(),
                userFio: getUsers[0].fio
            };
            dispatch(createComment(dataComment));
            reset();
            navigate();
        }
    };
    return (
        <section>
            <div className="container">
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <TextAreaFieldControl
                        control={control}
                        value={data.content || ""}
                        onChange={handleChange}
                        name="content"
                        label="Ваш отзыв"
                    />
                    {getEmailToken() ? (
                        <Button
                            type="submit"
                            className="submit_btn primary-btn"
                            disabled={!isValid}
                        >
                            Опубликовать
                        </Button>
                    ) : (
                        <NavLink to="/login">
                            <Button className="primary-btn">
                                Авторизоваться
                            </Button>
                        </NavLink>
                    )}
                </form>
            </div>
        </section>
    );
};
AddCommentForm.propTypes = {
    onSubmit: PropTypes.func
};

export default AddCommentForm;
