import React from "react";
import PropTypes from "prop-types";

export default function TitleDetalies({ item }) {
    return (
        <>
            <h4>{item.name}</h4>
            <h5>{item.price} руб.</h5>
            <p>{item.fullName}</p>
        </>
    );
}
TitleDetalies.propTypes = {
    item: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
