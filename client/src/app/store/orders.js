import { createSlice } from "@reduxjs/toolkit";
import ordersService from "../services/orders.service";
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

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        ordersRequested: (state) => {
            state.isLoading = true;
        },
        ordersReceved: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        ordersRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        ordersDeleteSuccessed: (state, action) => {
            state.entities = state.entities.filter(
                (el) => el._id !== action.payload
            );

            state.isLoading = false;
        },

        ordersDeleteFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        ordersAddSuccessed: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
            state.isLoading = false;
        },
        ordersAddFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: ordersReduser, actions } = ordersSlice;
const {
    ordersRequested,
    ordersReceved,
    ordersRequestFiled,
    ordersDeleteFailed,
    ordersDeleteSuccessed,
    ordersAddSuccessed,
    ordersAddFailed
} = actions;

export const loadOrdersList = () => async (dispatch) => {
    dispatch(ordersRequested());
    try {
        if (getUserId() !== null) {
            const { content } = await ordersService.getOrdersUser(getUserId());
            dispatch(ordersReceved(content));
        } else {
            dispatch(ordersReceved([]));
        }
    } catch (error) {
        dispatch(ordersRequestFiled(error.message));
    }
};

export const deleteOrders = (payload) => async (dispatch) => {
    dispatch(ordersRequested());
    try {
        const { content } = await ordersService.delete(payload);

        if (content === "ok") {
            dispatch(ordersDeleteSuccessed(payload));
        }
    } catch (error) {
        dispatch(ordersDeleteFailed(error.message));
    }
};
export const addOrders = (payload) => async (dispatch) => {
    dispatch(ordersRequested());
    try {
        const { content } = await ordersService.create(payload);
        dispatch(ordersAddSuccessed(content));
    } catch (error) {
        dispatch(ordersAddFailed(error.message));
    }
};

export const getOrdersUserAuth = () => (state) => state.orders.entities;

export const getOrdersLoadingStatus = () => (state) => state.orders.isLoading;

export default ordersReduser;
