import React from "react";
import PropTypes from "prop-types";
import Badge from "../ui/badge";
import FavouriteIcon from "../ui/favouriteIcon";
import _ from "lodash";
export default function FavouriteNavBar({ items }) {
    const isEmpty = _.isEmpty(items);
    return (
        <>
            {isEmpty !== true ? (
                <>
                    <FavouriteIcon status={true} />
                    <Badge circle warning value={items.length} />
                </>
            ) : (
                <FavouriteIcon status={false} />
            )}
        </>
    );
}
FavouriteNavBar.propTypes = {
    items: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
