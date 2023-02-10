import React from "react";
import PropTypes from "prop-types";
import Table from "../../components/tableUi/table";
import { NavLink } from "react-router-dom";
import Button from "../../components/ui/button";
import Picture from "../../components/ui/picture";

const BasketTable = ({ baskets, summa, kolvo, onDelete, ...rest }) => {
    const columns = {
        picture: {
            path: "picture",
            name: "Изображение",
            component: (baskets) => (
                <Picture
                    src={`/img/icon/${baskets.picture}`}
                    alt="торт"
                    width="90"
                    height="90"
                />
            )
        },
        name: {
            path: "name",
            name: "Имя",
            component: (baskets) => (
                <NavLink to={`/products/${baskets._id}`}>
                    {baskets.name}
                </NavLink>
            )
        },
        kolvo: {
            path: "kolvo",
            name: "Количество",
            component: (baskets) => <span>{baskets.kolvo} </span>
        },
        summa: {
            path: "summa",
            name: "Сумма",
            component: (baskets) => <span>{baskets.summa} руб.</span>
        },
        delete: {
            component: (baskets) => (
                <Button
                    onClick={() => onDelete(baskets._id)}
                    className="primary-btn"
                >
                    съем завтра
                </Button>
            )
        }
    };

    return (
        <div className="container">
            <Table columns={columns} data={baskets} />
            <p className="lead text-warning">
                <b> Итог:</b> количество <b>{kolvo} </b>
                сумма <b> {summa}</b> руб.
            </p>
        </div>
    );
};

BasketTable.propTypes = {
    baskets: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    summa: PropTypes.number,
    kolvo: PropTypes.number,
    onDelete: PropTypes.func.isRequired
};

export default BasketTable;
