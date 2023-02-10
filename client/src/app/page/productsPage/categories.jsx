import React from "react";
import PropTypes from "prop-types";

export default function Category({
    items,
    valueProperty,
    contentProperty,
    selectedItem,
    onItemSelect
}) {
    return (
        <>
            {Object.keys(items).map((item) => (
                <div
                    key={items[item][valueProperty]}
                    className="col-2 d-flex justify-content-center"
                >
                    <div className="categories__item__icon">
                        <a
                            href="#"
                            className={
                                "list-group-item" +
                                (items[item] === selectedItem ? " active" : "")
                            }
                            onClick={() => onItemSelect(items[item])}
                        >
                            <img
                                src={
                                    process.env.PUBLIC_URL +
                                    `/img/icon/${items[item].image}`
                                }
                                alt=""
                                width="70"
                                height="70"
                            />
                        </a>
                        <h5>{items[item].name}</h5>
                    </div>
                </div>
            ))}
        </>
    );
}
Category.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};
Category.propTypes = {
    items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func,
    selectedItem: PropTypes.object
};
