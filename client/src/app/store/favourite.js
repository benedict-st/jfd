import { createSlice } from "@reduxjs/toolkit";
import favouriteService from "../services/favourite.service";
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

const favouriteSlice = createSlice({
    name: "favourite",
    initialState,
    reducers: {
        favouriteRequested: (state) => {
            state.isLoading = true;
        },
        favouriteReceved: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        favouriteRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        favouriteDeleteSuccessed: (state, action) => {
            state.entities = state.entities.filter(
                (el) => el._id !== action.payload
            );
            state.isLoading = false;
        },

        favouriteDeleteFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        favouriteAddSuccessed: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
            state.isLoading = false;
        },
        favouriteAddFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: favouriteReduser, actions } = favouriteSlice;
const {
    favouriteRequested,
    favouriteReceved,
    favouriteRequestFiled,
    favouriteDeleteFailed,
    favouriteDeleteSuccessed,
    favouriteAddSuccessed,
    favouriteAddFailed
} = actions;

export const loadfavouriteList = () => async (dispatch) => {
    dispatch(favouriteRequested());
    try {
        if (getUserId() !== null) {
            const { content } = await favouriteService.getfavouriteUserAuth(
                getUserId()
            );
            dispatch(favouriteReceved(content));
        } else {
            dispatch(favouriteReceved([]));
        }
    } catch (error) {
        dispatch(favouriteRequestFiled(error.message));
    }
};

export const deletefavourite = (payload) => async (dispatch) => {
    dispatch(favouriteRequested());
    try {
        const { content } = await favouriteService.delete(payload);
        if (content === "ok") {
            dispatch(favouriteDeleteSuccessed(payload));
        }
    } catch (error) {
        dispatch(favouriteDeleteFailed(error.message));
    }
};
export const addfavourite = (payload) => async (dispatch) => {
    dispatch(favouriteRequested());
    try {
        const { content } = await favouriteService.create(payload);
        dispatch(favouriteAddSuccessed(content));
    } catch (error) {
        dispatch(favouriteAddFailed(error.message));
    }
};

export const getfavouriteUserAuth = () => (state) => state.favourite.entities;

export const getfavouriteLoadingStatus = () => (state) =>
    state.favourite.isLoading;

export default favouriteReduser;
