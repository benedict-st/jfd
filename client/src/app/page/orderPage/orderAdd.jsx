import React from "react";
import AddOrder from "../../components/formUI/addOrder";
import Breadcrumb from "../../components/pageUi/breadcrumb";
export default function OrderAdd() {
    return (
        <div>
            <Breadcrumb header="Сделать заказ" />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-8 offset-md-3 shadow p-4">
                        <AddOrder />
                    </div>
                </div>
            </div>
        </div>
    );
}
