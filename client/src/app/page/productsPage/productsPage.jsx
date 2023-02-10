import React from "react";
import PropTypes from "prop-types";
import Product from "./product";

export default function ProductsPage({ items }) {
    return (
        <>
            <section className="product spad">
                <div className="container">
                    <div className="row">
                        <Product items={items} />
                    </div>
                </div>
            </section>
        </>
    );
}
ProductsPage.propTypes = {
    items: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
