import React from "react";
import { NavLink } from "react-router-dom";
export default function NavBarMenu() {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <nav className="header__menu mobile-menu">
                            <ul>
                                <li>
                                    <NavLink to="/">Главная</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/orders">Мои заказы</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/contacts">Контакты</NavLink>
                                </li>

                                <li>
                                    <NavLink to="/profile">Профиль</NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}
