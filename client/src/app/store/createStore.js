import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsReduser from "./products";
import categoriesReducer from "./categories";
import basketReduser from "./basket";
import favouriteReduser from "./favourite";
import usersReducer from "./users";
import commentsReducer from "./comments";
import ordersReducer from "./orders";
const rootReducer = combineReducers({
    users: usersReducer,
    products: productsReduser,
    categories: categoriesReducer,
    basket: basketReduser,
    favourite: favouriteReduser,
    comments: commentsReducer,
    orders: ordersReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
