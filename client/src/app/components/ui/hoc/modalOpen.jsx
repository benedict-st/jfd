import React, { useState, useEffect } from "react";
import Modal from "../../modal/modal";
import { useSelector } from "react-redux";
import { setModalData } from "../../../services/localStorage.service";
import {
    getOrdersUserAuth,
    getOrdersLoadingStatus
} from "../../../store/orders";
import { orderDiffData, titleDateOrder } from "../../../utils/displayDate";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
export default function ModalOpen() {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [titleDate, setTitleDate] = useState("");
    const isLoadingStatus = useSelector(getOrdersLoadingStatus());
    const orders = useSelector(getOrdersUserAuth());
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoadingStatus && orders.length > 0) {
            const sortedOrders = _.orderBy(orders, ["orderData"], ["asc"]);
            setTitleDate(titleDateOrder(sortedOrders[0].orderData));
            setTitle(orderDiffData(sortedOrders[0].orderData));
            setTimeout(() => {
                setIsOpen(true);
            }, 2000);
        }
    }, [isLoadingStatus]);

    const handleSubmit = () => {
        navigate("/orders");
        setModalData();
        setIsOpen(false);
    };

    const handleCancel = () => {
        setModalData();
        setIsOpen(false);
    };

    return (
        <div>
            {!isLoadingStatus && title !== "" && orders.length > 0 ? (
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="header__top__inner">
                                <div className="header__top__left">
                                    <ul>
                                        <li>
                                            <Modal
                                                title={titleDate}
                                                body={title}
                                                isOpen={isOpen}
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
            ) : (
                <></>
            )}
        </div>
    );
}
