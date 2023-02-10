import React from "react";
import PropTypes from "prop-types";
import Category from "./сategory";
export default function CategoriesList({
    items,
    valueProperty,
    contentProperty,
    selectedItem,
    onItemSelect
}) {
    return (
        <>
            <div className="categories">
                <div className="container">
                    <div className="row">
                        <div className="categories__slider owl-carousel owl-loaded owl-drag">
                            <div className="container-fluid">
                                <div className="row">
                                    <Category
                                        selectedItem={selectedItem}
                                        items={items}
                                        onItemSelect={onItemSelect}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

CategoriesList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};
CategoriesList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func,
    selectedItem: PropTypes.object
};
