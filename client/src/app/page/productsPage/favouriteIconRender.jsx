import React from "react";
import FavouriteIcon from "../../components/ui/favouriteIcon";
import PropTypes from "prop-types";
export default function FavouriteIconRender({ favourite, id, onToggle }) {
    const favouriteFilter = favourite.filter((item) => item.productId === id);
    let statusfavourite = false;
    if (favouriteFilter && favouriteFilter.length !== 0) {
        statusfavourite = true;
    }
    return (
        <>
            <FavouriteIcon
                status={statusfavourite}
                onClick={() => onToggle(id)}
            />
        </>
    );
}
FavouriteIconRender.propTypes = {
    favourite: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    id: PropTypes.string,
    onToggle: PropTypes.func.isRequired
};
