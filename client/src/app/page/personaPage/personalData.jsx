import React from "react";
import { NavLink } from "react-router-dom";
import Spinner from "../../components/ui/spinner";
import Button from "../../components/ui/button";
import { getUsersList } from "../../store/users";
import { useSelector } from "react-redux";
export default function PersonalData() {
    const currentUser = useSelector(getUsersList());
    if (currentUser !== undefined) {
        return (
            <>
                {currentUser ? (
                    <div>
                        <div className="container mt-5">
                            <div className="row">
                                <div className="col-md-8 offset-md-3 shadow p-4">
                                    <ul className="list-group">
                                        <li className="list-group-item">
                                            <span>
                                                Ваше ФИО: {currentUser[0].fio}
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            <span>
                                                Телефон: {currentUser[0].phone}
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            <span>
                                                Адрес доставки:{" "}
                                                {currentUser[0].address}
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            <span>
                                                Электронная почта:{" "}
                                                {currentUser[0].email}
                                            </span>
                                        </li>
                                    </ul>
                                    <Button
                                        type="button"
                                        className="primary-btn"
                                    >
                                        <NavLink
                                            to={`/profile/${currentUser[0]._id}`}
                                        >
                                            Изменить
                                        </NavLink>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Spinner />
                )}
            </>
        );
    }
    return <div>Требуется авторизация</div>;
}
