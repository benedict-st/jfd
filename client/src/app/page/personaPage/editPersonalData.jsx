import React from "react";
import EditPersonaDataForm from "../../components/formUI/editPersonaForm";
import { useParams, Navigate } from "react-router-dom";
import { getUsersList, getCurrentUserId } from "../../store/users";
import { useSelector } from "react-redux";

export default function editPersonalData() {
    const param = useParams();
    const currentUser = useSelector(getUsersList());
    const isLoggedIn = useSelector(getCurrentUserId());
    if (param.userId !== isLoggedIn) {
        return <Navigate to="/profile" />;
    }
    return (
        <>
            {currentUser ? (
                <>
                    <EditPersonaDataForm data={currentUser[0]} />
                </>
            ) : (
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-8 offset-md-3 shadow p-4">
                            Требуется авторизация
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
