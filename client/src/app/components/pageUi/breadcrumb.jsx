import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

export default function Breadcrumb({ header }) {
    return (
        <>
            <div className="container ">
                <div className="row">
                    <div className="breadcrumb ">
                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="breadcrumb__text">
                                <h2>{header}</h2>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="breadcrumb__links">
                                <NavLink to="/"> Главная</NavLink>

                                <span className="breadcrumb__text_link">
                                    {header}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
Breadcrumb.propTypes = {
    header: PropTypes.string
};
