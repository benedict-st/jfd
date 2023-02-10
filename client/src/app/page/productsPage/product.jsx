import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import SaleProduct from "./saleProduct";
import FavouriteIconRender from "./favouriteIconRender";
import CategoryProduct from "./categoriesProduct";
import Picture from "../../components/ui/picture";
import { addBasket } from "../../store/basket";
import {
    getfavouriteUserAuth,
    addfavourite,
    deletefavourite
} from "../../store/favourite";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/ui/button";
import { getUserId } from "../../services/localStorage.service";

const Product = ({ items, valueProperty }) => {
    const favourite = useSelector(getfavouriteUserAuth());
    const dispatch = useDispatch();
    const handleSubmit = (product) => {
        if (getUserId()) {
            const dataBasket = {
                productId: product._id,
                summa: product.price,
                kolvo: 1,
                picture: product.picture,
                name: product.name,
                userId: getUserId()
            };
            dispatch(addBasket(dataBasket));
        }
    };

    const onToggleFavorit = (id) => {
        const productFilter = items.filter((p) => p._id === id);
        if (getUserId()) {
            const favouriteFilter = favourite.filter(
                (item) => item.productId === id
            );
            if (favouriteFilter && favouriteFilter.length !== 0) {
                dispatch(deletefavourite(favouriteFilter[0]._id));
            } else {
                dispatch(
                    addfavourite({
                        productId: id,
                        name: productFilter[0].name,
                        price: productFilter[0].price,
                        picture: productFilter[0].picture,
                        fullname: productFilter[0].fullname,
                        userId: getUserId(),
                        favourite: true
                    })
                );
            }
        }
    };
    return (
        <>
            {Object.keys(items).map((item) => (
                <div
                    key={items[item][valueProperty]}
                    className="col-lg-3 col-md-6 col-sm-6"
                >
                    <div className="product__item">
                        <div className="product__item__pic set-bg">
                            <Picture
                                src={`/img/icon/${items[item].picture}`}
                                alt="торт"
                                width="300"
                                height="300"
                            />
                            <CategoryProduct
                                categoryId={items[item].category}
                            />
                        </div>
                        <div className="product__item__text">
                            <h6>
                                <NavLink to={`/products/${items[item]._id}`}>
                                    {items[item].name}
                                </NavLink>
                            </h6>
                            <h6>
                                {items[item].price} руб.
                                <SaleProduct sale={items[item].sale} />
                            </h6>

                            <div className="row">
                                <div className="col">
                                    <span>
                                        {getUserId() ? (
                                            <Button
                                                onClick={() =>
                                                    handleSubmit(items[item])
                                                }
                                                className="primary-btn"
                                            >
                                                Хочу
                                            </Button>
                                        ) : (
                                            <NavLink to="/login">
                                                <Button className="primary-btn">
                                                    Хочу
                                                </Button>
                                            </NavLink>
                                        )}
                                    </span>
                                </div>

                                <div className="col">
                                    <FavouriteIconRender
                                        favourite={favourite}
                                        id={items[item]._id}
                                        onToggle={onToggleFavorit}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};
Product.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};
Product.propTypes = {
    items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onToggleFavorit: PropTypes.func
};

export default Product;
