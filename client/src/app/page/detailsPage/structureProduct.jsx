import React from "react";
import PropTypes from "prop-types";
export default function StructureProduct({ item }) {
    return (
        <>
            <ul>
                <li>
                    Срок хранения: <span>{item.shelfLife}</span>
                </li>
                <li>
                    Вес: <span>{item.weight}</span>
                </li>
                <li>
                    Tags: <span>Gadgets, minimalisstic</span>
                </li>
            </ul>
        </>
    );
}
StructureProduct.propTypes = {
    item: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
