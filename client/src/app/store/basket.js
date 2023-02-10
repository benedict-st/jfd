import { createSlice } from "@reduxjs/toolkit";
import basketService from "../services/basket.service";
import { getUserId, getAccessToken } from "../services/localStorage.service";

const initialState = getAccessToken()
    ? {
          entities: [],
          isLoading: true,
          error: null,
          auth: { userId: getUserId() },
          isLoggedIn: true,
          dataLoaded: false
      }
    : {
          entities: [],
          isLoading: false,
          error: null,
          auth: { userId: null },
          isLoggedIn: false
      };

const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        basketRequested: (state) => {
            state.isLoading = true;
        },
        basketReceved: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        basketRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        basketDeleteSuccessed: (state, action) => {
            state.entities = state.entities.filter(
                (el) => el.productId !== action.payload
            );
            state.isLoading = false;
        },

        basketDeleteFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        basketAddSuccessed: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
            state.isLoading = false;
        },
        basketAddFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: basketReduser, actions } = basketSlice;
const {
    basketRequested,
    basketReceved,
    basketRequestFiled,
    basketDeleteFailed,
    basketDeleteSuccessed,
    basketAddSuccessed,
    basketAddFailed
} = actions;

export const loadBasketList = () => async (dispatch) => {
    dispatch(basketRequested());
    try {
        if (getUserId() !== null) {
            const { content } = await basketService.getBasketUser(getUserId());
            dispatch(basketReceved(content));
        } else {
            dispatch(basketReceved([]));
        }
    } catch (error) {
        dispatch(basketRequestFiled(error.message));
    }
};

export const deleteBasket = (payload) => async (dispatch) => {
    dispatch(basketRequested());
    try {
        const { content } = await basketService.delete(payload);
        if (content === "ok") {
            dispatch(basketDeleteSuccessed(payload));
        }
    } catch (error) {
        dispatch(basketDeleteFailed(error.message));
    }
};
export const addBasket = (payload) => async (dispatch) => {
    dispatch(basketRequested());
    try {
        const { content } = await basketService.create(payload);
        dispatch(basketAddSuccessed(content));
    } catch (error) {
        dispatch(basketAddFailed(error.message));
    }
};

export const getBasketUserAuth = () => (state) => state.basket.entities;

export const getBasketLoadingStatus = () => (state) => state.basket.isLoading;

export default basketReduser;
