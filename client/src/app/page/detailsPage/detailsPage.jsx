import React, { useState, useEffect, useRef } from "react";
import { useParams, NavLink, Navigate } from "react-router-dom";
import Button from "../../components/ui/button";
import SpinnerRender from "../../components/ui/spinner";
import Picture from "../../components/ui/picture";
import StructureProduct from "./structureProduct";
import CategoryDetails from "./categoriesDetails";
import TitleDetalies from "./titleDetalies";
import { getUserId } from "../../services/localStorage.service";
import FavouriteIconRender from "../../page/productsPage/favouriteIconRender";
import Comments from "../detailsPage/comments";
import { addBasket } from "../../store/basket";
import { useSelector, useDispatch } from "react-redux";
import {
    getProductsById,
    getProductsLoadingStatus
} from "../../store/products";
import { getCategoriesById } from "../../store/categories";
import {
    getfavouriteUserAuth,
    deletefavourite,
    addfavourite
} from "../../store/favourite";

export default function Details() {
    const params = useParams();
    const { productId } = params;
    const isLoadingProduct = useSelector(getProductsLoadingStatus());
    const product = useSelector(getProductsById(productId));
    const [productLoad, setProductLoad] = useState([]);
    const [categoryLoad, setCategoryLoad] = useState([]);
    useEffect(() => {
        if (!isLoadingProduct) {
            setProductLoad(product);
        }
    }, [isLoadingProduct]);
    if (!isLoadingProduct) {
        if (product === undefined) {
            return <Navigate to="/" />;
        }
    }
    const category = useSelector(getCategoriesById(productLoad.category));
    useEffect(() => {
        if (category !== undefined) {
            setCategoryLoad(category);
        }
    }, [category]);

    const favourite = useSelector(getfavouriteUserAuth());
    const dispatch = useDispatch();
    const [count, setCount] = useState(1);
    const prevRef = useRef(count);
    useEffect(() => {
        prevRef.current = count;
    }, [count]);
    const decrement = () => {
        if (prevRef.current > 0) {
            setCount(count - 1);
        }
    };
    const increment = () => {
        setCount(count + 1);
    };

    const handleToggleBookMark = (id) => {
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
                        name: product.name,
                        price: product.price,
                        picture: product.picture,
                        fullname: product.fullname,
                        userId: getUserId(),
                        favourite: true
                    })
                );
            }
        }
    };

    const handleSubmit = (product) => {
        if (getUserId()) {
            const dataBasket = {
                productId: product._id,
                picture: product.picture,
                summa: Number(product.price) * Number(count),
                kolvo: Number(count),
                name: product.name,
                userId: getUserId()
            };
            dispatch(addBasket(dataBasket));
        }
    };
    if (product && category && favourite) {
        return (
            <>
                <section className="product-details spad">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="product__details__img">
                                    <div className="product__details__big__img">
                                        <Picture
                                            src="/img/details/cake-1-big.png"
                                            alt="торт"
                                            width="440"
                                            height="440"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="product__details__text">
                                    <CategoryDetails item={categoryLoad.name} />
                                    <span className="productt__favourite">
                                        <FavouriteIconRender
                                            favourite={favourite}
                                            id={product._id}
                                            onToggle={handleToggleBookMark}
                                        />
                                    </span>
                                    <TitleDetalies item={product} />

                                    <StructureProduct item={product} />
                                    <div className="product__details__option">
                                        <div className="pro-qty">
                                            <div className="d-flex flex-row justify-content-center">
                                                <div className="d-flex align-items-center">
                                                    <Button
                                                        onClick={decrement}
                                                        className="dec qtybtn"
                                                    >
                                                        -
                                                    </Button>
                                                </div>

                                                <div className="d-flex align-items-center">
                                                    <span>{count}</span>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <Button
                                                        className="inc qtybtn"
                                                        onClick={increment}
                                                    >
                                                        +
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                        {getUserId() ? (
                                            <Button
                                                onClick={() =>
                                                    handleSubmit(product)
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="container">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-8">
                                <Comments />
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    } else {
        return (
            <h1>
                <SpinnerRender />
            </h1>
        );
    }
}
