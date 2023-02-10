import React from "react";
import PersonalData from "../personaPage/personalData";
import { getUsersList } from "../../store/users";
import { useSelector } from "react-redux";
export default function PersonalPage() {
    const currentUser = useSelector(getUsersList());
    if (currentUser) {
        return (
            <div>
                <PersonalData />
            </div>
        );
    } else {
        return (
            <>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-8 offset-md-3 shadow p-4">
                            Требуется авторизация
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
