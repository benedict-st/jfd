import React from "react";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../store/users";
import Order from "../../page/orderPage";
const OrderLayouts = () => {
    const LoggedIn = useSelector(getIsLoggedIn());
    return (
        <>
            {LoggedIn ? (
                <Order />
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
};
export default OrderLayouts;
