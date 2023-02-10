import React from "react";
import Detalies from "../../page/detailsPage";
import Breadcrumb from "../../components/pageUi/breadcrumb";
export default function Details() {
    return (
        <>
            <Breadcrumb header="Подробно о вкусняшке" />
            <Detalies />
        </>
    );
}
