import React from "react";
import PropTypes from "prop-types";

export default function CategoryDetails({ item }) {
    return (
        <>
            <div className="product__label">{item}</div>
        </>
    );
}
CategoryDetails.propTypes = {
    item: PropTypes.string
};
