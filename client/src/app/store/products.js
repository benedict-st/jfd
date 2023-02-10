import { createSlice } from "@reduxjs/toolkit";
import productService from "../services/products.service";
const initialState = {
    entities: [],
    isLoading: true,
    error: null,
    lastFetch: null
};
const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        productsRequested: (state) => {
            state.isLoading = true;
        },
        productsReceved: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        productsRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: productsReduser, actions } = productsSlice;
const { productsRequested, productsReceved, productsRequestFiled } = actions;
function isOutdated(date) {
    if (Date.now() - date > 10 * 60 * 1000) {
        return true;
    }
    return false;
}

export const loadProductsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().products;
    if (isOutdated(lastFetch)) {
        dispatch(productsRequested());
        try {
            const { content } = await productService.fetchAll();
            dispatch(productsReceved(content));
        } catch (error) {
            dispatch(productsRequestFiled(error.message));
        }
    }
};

export const getProducts = () => (state) => state.products.entities;

export const getProductsLoadingStatus = () => (state) =>
    state.products.isLoading;

export const getProductsById = (productsId) => (state) => {
    if (state.products.entities) {
        const productsArray = [];
        for (const prod of state.products.entities) {
            if (prod._id === productsId) {
                productsArray.push(prod);
                break;
            }
        }
        return productsArray[0];
    }
    return [];
};
export default productsReduser;
