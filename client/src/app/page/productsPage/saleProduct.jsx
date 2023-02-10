import React from "react";
import PropTypes from "prop-types";
import Badge from "../../components/ui/badge";
export default function SaleProduct({ price, sale }) {
    return <>{sale === "да" ? <Badge alert value="Sale" /> : ""}</>;
}
SaleProduct.propTypes = {
    price: PropTypes.string,
    sale: PropTypes.string
};
