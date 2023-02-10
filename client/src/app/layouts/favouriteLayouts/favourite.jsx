import React from "react";
import Breadcrumb from "../../components/pageUi/breadcrumb";
import FavouritePage from "../../page/favouritePage";
const Favourite = () => {
    return (
        <div>
            <Breadcrumb header="Мои хотелки" />
            <FavouritePage />
        </div>
    );
};
export default Favourite;
