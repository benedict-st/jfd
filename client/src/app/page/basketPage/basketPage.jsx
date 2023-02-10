import React from "react";
import BasketTable from "./basketTable";
import { getBasketUserAuth, deleteBasket } from "../../store/basket";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

export default function BasketPage() {
    const basket = useSelector(getBasketUserAuth());
    const dispatch = useDispatch();
    const isEmptyBasket = _.isEmpty(basket);
    let summaItog = 0;
    let kolvoItog = 0;
    if (isEmptyBasket !== true) {
        const basketSumma = basket.reduce(function (
            previousValue,
            currentValue
        ) {
            return {
                summa: Number(previousValue.summa) + Number(currentValue.summa),
                kolvo: Number(previousValue.kolvo) + Number(currentValue.kolvo)
            };
        });
        summaItog = basketSumma.summa;
        kolvoItog = basketSumma.kolvo;

        const basketID = Array.from(basket, ({ productId }) => productId);
        const uniqueBasketID = [...new Set(basketID)];
        const rollUpBasket = [];
        uniqueBasketID.forEach(function (a) {
            const someUsers = basket.filter((item) => item.productId === a);
            const basketSumma = someUsers.reduce(function (
                previousValue,
                currentValue
            ) {
                return {
                    summa:
                        Number(previousValue.summa) +
                        Number(currentValue.summa),
                    kolvo:
                        Number(previousValue.kolvo) +
                        Number(currentValue.kolvo),
                    name: previousValue.name,
                    id: previousValue.id,
                    picture: previousValue.picture
                };
            });
            const obj = {};
            obj._id = a;
            obj.name = basketSumma.name;
            obj.summa = basketSumma.summa;
            obj.kolvo = basketSumma.kolvo;
            obj.picture = basketSumma.picture;
            rollUpBasket.push(obj);
        });
        const handleDelete = (id) => {
            dispatch(deleteBasket(id));
        };
        return (
            <div>
                {isEmptyBasket !== true ? (
                    <BasketTable
                        baskets={rollUpBasket}
                        summa={summaItog}
                        kolvo={kolvoItog}
                        onDelete={handleDelete}
                    />
                ) : (
                    <span> В корзине пусто</span>
                )}
            </div>
        );
    } else {
        return (
            <>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-8 offset-md-3 shadow p-4">
                            В корзине пусто
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
