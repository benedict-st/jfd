import React from "react";
import PropTypes from "prop-types";
import Table from "../../components/tableUi/table";
import { NavLink } from "react-router-dom";
import FavouriteIcon from "../../components/ui/favouriteIcon";
import Picture from "../../components/ui/picture";
import BasketIcon from "../../components/ui/basketIcon";
const FavouriteTable = ({
    favourite,
    onToggleBookMark,
    onHandleSubmit,
    ...rest
}) => {
    const columns = {
        picture: {
            path: "picture",
            name: "Изображение",
            component: (favourite) => (
                <Picture
                    src={`/img/icon/${favourite.picture}`}
                    alt="торт"
                    width="90"
                    height="90"
                />
            )
        },
        name: {
            path: "name",
            name: "Имя",
            component: (favourite) => (
                <NavLink to={`/products/${favourite.productId}`}>
                    {favourite.name}
                </NavLink>
            )
        },
        price: {
            price: "price",
            name: "Цена",
            component: (favourite) => <span>{favourite.price} руб.</span>
        },
        sale: {
            sale: "sale",
            name: "Распродажа",
            component: (favourite) => <span>{favourite.sale} </span>
        },

        favourite: {
            path: "favourite",
            name: "Избранное",
            component: (favourite) => (
                <FavouriteIcon
                    status={favourite.favourite}
                    onClick={() => onToggleBookMark(favourite._id)}
                />
            )
        },
        basket: {
            path: "favourite",
            name: "В корзину",
            component: (favourite) => (
                <BasketIcon onClick={() => onHandleSubmit(favourite._id)} />
            )
        }
    };
    return (
        <div className="container">
            <Table columns={columns} data={favourite} />
        </div>
    );
};

FavouriteTable.propTypes = {
    favourite: PropTypes.array.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
    onHandleSubmit: PropTypes.func.isRequired
};

export default FavouriteTable;
