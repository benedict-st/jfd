import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/users";
import { NavLink } from "react-router-dom";
const LogOut = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(logOut());
        <NavLink to="/" />;
    }, []);
    return <h1>Loading</h1>;
};

export default LogOut;
