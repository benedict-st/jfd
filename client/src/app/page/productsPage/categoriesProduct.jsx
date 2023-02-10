import React from "react";
import PropTypes from "prop-types";

import { getCategoriesById } from "../../store/categories";
import { useSelector } from "react-redux";
export default function CategoryProduct({ categoryId }) {
    const category = useSelector(getCategoriesById(categoryId));
    return (
        <div>
            <div className="product__label">{category.name}</div>
        </div>
    );
}
CategoryProduct.propTypes = {
    categoryId: PropTypes.string.isRequired
};
