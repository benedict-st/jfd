import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Spinner from "../spinner";
import { useDispatch, useSelector } from "react-redux";
import { loadProductsList } from "../../../store/products";
import { loadCategoriesList } from "../../../store/categories";
import { loadBasketList } from "../../../store/basket";
import { loadfavouriteList } from "../../../store/favourite";
import { loadOrdersList } from "../../../store/orders";
import {
    getIsLoggedIn,
    loadUsersList,
    getUserLoadingStatus
} from "../../../store/users";

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const userStatusLoading = useSelector(getUserLoadingStatus());
    useEffect(() => {
        dispatch(loadProductsList());
        dispatch(loadCategoriesList());
        if (isLoggedIn) {
            dispatch(loadBasketList());
            dispatch(loadfavouriteList());
            dispatch(loadUsersList());
            dispatch(loadOrdersList());
        }
    }, [isLoggedIn]);
    if (userStatusLoading) return <Spinner />;
    return children;
};

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AppLoader;
