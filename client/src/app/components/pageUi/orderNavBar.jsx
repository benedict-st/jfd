import React from "react";
import PropTypes from "prop-types";
import Badge from "../ui/badge";
import OrderIcon from "../ui/orderIcon";

export default function OrderNavBar({ items }) {
    return (
        <>
            {items.length > 0 ? (
                <>
                    <OrderIcon status={true} />
                    <Badge circle warning value={items.length} />
                </>
            ) : (
                <OrderIcon status={false} />
            )}
        </>
    );
}
OrderNavBar.propTypes = {
    items: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
