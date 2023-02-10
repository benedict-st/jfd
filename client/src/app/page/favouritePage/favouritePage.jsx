import React from "react";
import FavouriteTable from "./favouriteTable";
import { getUserId } from "../../services/localStorage.service";
import { addBasket } from "../../store/basket";
import {
    getfavouriteUserAuth,
    deletefavourite,
    getfavouriteLoadingStatus
} from "../../store/favourite";
import { useDispatch, useSelector } from "react-redux";
export default function FavouritePage() {
    const favourite = useSelector(getfavouriteUserAuth());
    const isLoadingStatus = useSelector(getfavouriteLoadingStatus());
    const dispatch = useDispatch();

    const handleSubmit = (id) => {
        if (getUserId()) {
            const favouriteFilter = favourite.filter((item) => item._id === id);
            const dataBasket = {
                productId: favouriteFilter[0]._id,
                summa: favouriteFilter[0].price,
                kolvo: 1,
                picture: favouriteFilter[0].picture,
                name: favouriteFilter[0].name,
                userId: getUserId()
            };
            dispatch(addBasket(dataBasket));
        }
    };
    const handleToggleBookMark = (id) => {
        const favouriteFilter = favourite.filter((item) => item._id === id);
        if (getUserId()) {
            dispatch(deletefavourite(favouriteFilter[0]._id));
        }
    };
    return (
        <div>
            {!isLoadingStatus && favourite.length > 0 ? (
                <FavouriteTable
                    favourite={favourite}
                    onToggleBookMark={handleToggleBookMark}
                    onHandleSubmit={handleSubmit}
                />
            ) : (
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-8 offset-md-3 shadow p-4">
                            Пока ничего не хочу
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
