import React, { useState } from "react";
import PropTypes from "prop-types";

export default function Sliders({
    items,
    valueProperty,
    selectedItem,
    onItemSelect
}) {
    const [categories] = useState(items);

    return (
        <div className="categories__slider owl-carousel owl-loaded owl-drag">
            <div className="slider">
                <div className="slider__track">
                    {Object.keys(categories).map((item) => {
                        return (
                            <div
                                key={items[item][valueProperty]}
                                className="slider__item"
                            >
                                <a
                                    href="#"
                                    className={
                                        "list-group-item" +
                                        (items[item] === selectedItem
                                            ? " active"
                                            : "")
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
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

Sliders.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};
Sliders.propTypes = {
    items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func,
    selectedItem: PropTypes.object
};
