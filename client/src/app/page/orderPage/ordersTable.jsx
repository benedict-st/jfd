import React from "react";
import PropTypes from "prop-types";
import Table from "../../components/tableUi/table";
import { NavLink } from "react-router-dom";
import DeleteIcon from "../../components/ui/deleteIcon";
import moment from "moment";
import Button from "../../components/ui/button";

const OrdersTable = ({ orders, openModal, ...rest }) => {
    const summaOrder = (kolvo, price) => {
        return Number(kolvo) * Number(price);
    };

    const columns = {
        idOrder: {
            path: "idOrder",
            name: "Номер заказа",
            component: (orders) => <b>{orders.idOrder}</b>
        },
        productName: {
            path: "productName",
            name: "Название",
            component: (orders) => (
                <NavLink to={`/products/${orders.productId}`}>
                    {orders.productName}
                </NavLink>
            )
        },
        address: {
            path: "address",
            name: "Адрес",
            component: (orders) => {
                if (orders.deliveryType === "himself") {
                    if (orders.himselfAdress === "point1") {
                        return (
                            <span>г. Белгород ул.Попова д.4 (самовывоз)</span>
                        );
                    } else if (orders.himselfAdress === "point2") {
                        return (
                            <span>
                                г. Белгород ул.Заречная д.15а (самовывоз)
                            </span>
                        );
                    }
                } else {
                    return <span>{orders.address} (доставка)</span>;
                }
            }
        },

        kolvo: {
            path: "kolvo",
            name: "Количество",
            component: (orders) => <span>{orders.kolvo}</span>
        },
        summa: {
            path: "summa",
            name: "Сумма",
            component: (orders) => (
                <span>{summaOrder(orders.kolvo, orders.price)}</span>
            )
        },
        orderData: {
            path: "orderData",
            name: "Дата заказа",
            component: (orders) => (
                <span>{moment(orders.orderData).format("DD-MM-YYYY")} </span>
            )
        },
        delete: {
            name: "Удалить",
            component: (orders) => (
                <Button onClick={() => openModal(orders.orderData, orders._id)}>
                    <DeleteIcon status={true} />
                </Button>
            )
        }
    };
    return (
        <>
            <div className="container">
                <Table columns={columns} data={orders} />
            </div>
        </>
    );
};

OrdersTable.propTypes = {
    orders: PropTypes.array.isRequired,
    openModal: PropTypes.func.isRequired
};

export default OrdersTable;
