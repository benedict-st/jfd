import React, { useEffect, useState } from "react";
import OrdersTable from "./ordersTable";
import Button from "../../components/ui/button";
import {
    getOrdersUserAuth,
    getOrdersLoadingStatus,
    deleteOrders
} from "../../store/orders";
import Breadcrumb from "../../components/pageUi/breadcrumb";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import Modal from "../../components/modal/modal";
import { checkDateOrder } from "../../utils/displayDate";

import _ from "lodash";
export default function Order() {
    const orders = useSelector(getOrdersUserAuth());
    const [sortedOrders, setSortedOrders] = useState([]);
    const isLoadingStatus = useSelector(getOrdersLoadingStatus());
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [body, setBody] = useState("");
    const [idOrder, setIdOrder] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isDisable, setIsDisable] = useState(false);
    const handleSubmit = () => {
        dispatch(deleteOrders(idOrder));
        navigate("/orders");
        setIsOpen(false);
        setIdOrder("");
    };
    const handleCancel = () => {
        navigate("/orders");
        setIsOpen(false);
        setIdOrder("");
    };

    useEffect(() => {
        setSortedOrders(orders);
        if (orders.length > 0) {
            setSortedOrders(_.orderBy(orders, ["orderData"], ["asc"]));
        }
    }, [orders]);

    const handleOpenModal = (orderData, id) => {
        setIdOrder(id);
        const bodyForm = checkDateOrder(orderData);
        const arr = bodyForm.split(".");
        if (arr[0] === "1") {
            setBody(checkDateOrder(orderData));
            setIsDisable(false);
        } else {
            setBody(checkDateOrder(orderData));
            setIsDisable(true);
        }

        setIsOpen(true);
    };

    return (
        <>
            <Breadcrumb header="Мои заказы" />
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="header__top__inner">
                                <div className="header__top__left">
                                    <ul>
                                        <li>
                                            <Modal
                                                title="Статус заказа"
                                                body={body}
                                                isOpen={isOpen}
                                                disable={isDisable}
                                                onCancel={handleCancel}
                                                onSubmit={handleSubmit}
                                            ></Modal>

                                            <span className="arrow_carrot-down"></span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
            <>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-8 offset-md-3 shadow p-4 text-center">
                            <NavLink to="/addOrder">
                                <Button className="primary-btn">
                                    Сделать заказ
                                </Button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </>
            <>
                {!isLoadingStatus && sortedOrders.length > 0 ? (
                    <>
                        <OrdersTable
                            orders={sortedOrders}
                            openModal={handleOpenModal}
                        />
                    </>
                ) : (
                    <div className="container mt-5">
                        <div className="row">
                            <div className="col-md-8 offset-md-3 shadow p-4">
                                Заказов пока нет
                            </div>
                        </div>
                    </div>
                )}
            </>
        </>
    );
}
