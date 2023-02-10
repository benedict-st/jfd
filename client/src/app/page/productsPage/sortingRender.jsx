import React, { useRef } from "react";
import PropTypes from "prop-types";

export default function SortingRender({
    onSort,
    selectedSort,
    onClearFilter,
    onHandleSearchQuery,
    onSearchQuery
}) {
    const handleSort = (name) => {
        onSort({
            path: name,
            order: selectedSort.order === "desc" ? "asc" : "desc"
        });
    };

    const renderSortArrow = (selectedSort, currentPath) => {
        if (selectedSort.path === currentPath) {
            if (selectedSort.order === "asc") {
                return <i className="bi bi-caret-down-fill"></i>;
            } else {
                return <i className="bi bi-caret-up-fill"></i>;
            }
        }
        return null;
    };
    const textInputSearch = useRef(null);
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <div className="btn-group me-2">
                            <button
                                onClick={() => handleSort("price")}
                                type="button"
                                className="btn sort-primary-btn"
                            >
                                {renderSortArrow(selectedSort, "price")}
                                по цене
                            </button>
                            <button
                                onClick={() => handleSort("sale")}
                                type="button"
                                className=" btn sort-primary-btn"
                            >
                                {renderSortArrow(selectedSort, "sale")}
                                распродажи
                            </button>
                            <button
                                onClick={() => onClearFilter(textInputSearch)}
                                type="button"
                                className=" btn sort-primary-btn"
                            >
                                показать все
                            </button>
                            <input
                                className="form-control search-input"
                                type="text"
                                name="searchQuery"
                                placeholder="Search..."
                                onChange={onHandleSearchQuery}
                                value={onSearchQuery}
                                ref={textInputSearch}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
SortingRender.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onClearFilter: PropTypes.func.isRequired,
    onHandleSearchQuery: PropTypes.func.isRequired,
    onSearchQuery: PropTypes.string
};
