import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Picture from "../ui/picture";
import FavouriteNavBar from "./favouriteNavBar";
import NavBarMenu from "./navBarMenu";
import BaskerNavBar from "../pageUi/basketNavBar";
import PersonalNavBar from "./personalNavBar";
import OrderNavBar from "./orderNavBar";
import PropTypes from "prop-types";
import {
    getUsersList,
    getIsLoggedIn,
    getUserLoadingStatus
} from "../../store/users";
import { getBasketUserAuth, getBasketLoadingStatus } from "../../store/basket";
import {
    getfavouriteUserAuth,
    getfavouriteLoadingStatus
} from "../../store/favourite";
import { getOrdersUserAuth, getOrdersLoadingStatus } from "../../store/orders";
import { useSelector } from "react-redux";
import Spinner from "../../components/ui/spinner";
export default function NavBar({ onToggle }) {
    const currentUser = useSelector(getUsersList());
    const basket = useSelector(getBasketUserAuth());
    const favourite = useSelector(getfavouriteUserAuth());
    const orders = useSelector(getOrdersUserAuth());
    const isLoggedIn = useSelector(getIsLoggedIn());
    const isLoadingStatus = useSelector(getUserLoadingStatus());
    const isLoadingBasket = useSelector(getBasketLoadingStatus());
    const isLoadingfavourite = useSelector(getfavouriteLoadingStatus());
    const isLoadingOrders = useSelector(getOrdersLoadingStatus());
    const [user, setCurrentUser] = useState();
    useEffect(() => {
        if (typeof currentUser[0] !== "undefined" || !isLoadingStatus) {
            setCurrentUser(currentUser);
        }
    }, [currentUser]);

    return (
        <>
            {!isLoadingStatus &&
            !isLoadingBasket &&
            !isLoadingfavourite &&
            !isLoadingOrders &&
            user ? (
                <header className="header">
                    <div className="header__top">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="header__top__inner">
                                        <div className="header__top__left">
                                            <ul>
                                                <li>
                                                    {isLoggedIn ? (
                                                        <></>
                                                    ) : (
                                                        <NavLink to="/login">
                                                            <b>ВОЙТИ</b>
                                                        </NavLink>
                                                    )}
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="header__logo">
                                            <NavLink to="/">
                                                <Picture
                                                    src="img/logo.png"
                                                    alt=""
                                                    width="175"
                                                    height="50"
                                                />
                                            </NavLink>
                                        </div>
                                        <div className="header__top__right">
                                            <ul>
                                                <li>
                                                    {favourite && (
                                                        <NavLink to="/favourite">
                                                            <FavouriteNavBar
                                                                items={
                                                                    favourite
                                                                }
                                                            />
                                                        </NavLink>
                                                    )}
                                                </li>
                                                <li>
                                                    {orders && (
                                                        <NavLink to="/orders">
                                                            <OrderNavBar
                                                                items={orders}
                                                            />
                                                        </NavLink>
                                                    )}
                                                </li>
                                                <li>
                                                    {basket && (
                                                        <NavLink to="/basket">
                                                            <BaskerNavBar
                                                                items={basket}
                                                            />
                                                        </NavLink>
                                                    )}
                                                </li>
                                                <li>
                                                    {user ? (
                                                        <PersonalNavBar
                                                            authUser={user}
                                                            onToggle={onToggle}
                                                        />
                                                    ) : (
                                                        <></>
                                                    )}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <NavBarMenu />
                </header>
            ) : (
                <Spinner />
            )}
        </>
    );
}

NavBar.propTypes = {
    basket: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    isLoadingBasket: PropTypes.bool,
    onToggle: PropTypes.func
};
