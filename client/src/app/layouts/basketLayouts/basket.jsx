import React from "react";
import Breadcrumb from "../../components/pageUi/breadcrumb";
import BasketPage from "../../page/basketPage";
const Basket = () => {
    return (
        <div>
            <Breadcrumb header="Мои покупки" />
            <BasketPage />
        </div>
    );
};
export default Basket;
