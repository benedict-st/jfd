import React, { useState } from "react";
import PropTypes from "prop-types";
import PersonaIcon from "../ui/personaIcon";
import { NavLink } from "react-router-dom";

export default function PersonalNavBar({ authUser, onToggle }) {
    const [isOpen, setOpen] = useState();
    const toggleMenu = () => {
        setOpen((prevState) => !prevState);
    };

    return (
        <>
            {authUser.length > 0 ? (
                <div className="dropdown" onClick={toggleMenu}>
                    <div className="btn dropdown-toggle d-flex align-items-center">
                        <div className="me-2">
                            <div className="my-flex-cont">
                                <div className="my-flex-box">
                                    <PersonaIcon status={true} />
                                </div>
                                <div className="my-flex-box">
                                    <span className="header__top__right_span">
                                        {authUser[0].fio}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className={
                            "w-100 dropdown-menu" + (isOpen ? " show" : "")
                        }
                    >
                        <NavLink to={`/profile`} className="dropdown-item">
                            Профиль
                        </NavLink>
                        <button
                            className="btn btn-secondary-light"
                            onClick={onToggle}
                        >
                            Сменить тему
                        </button>
                        <NavLink to="logout" className="dropdown-item">
                            Выйти
                        </NavLink>
                    </div>
                </div>
            ) : (
                <></>
                // <PersonaIcon status={false} />
            )}
        </>
    );
}
PersonalNavBar.propTypes = {
    authUser: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    onToggle: PropTypes.func
};
