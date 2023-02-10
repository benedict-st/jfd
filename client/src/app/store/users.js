import { createAction, createSlice } from "@reduxjs/toolkit";
import userService from "../services/user.service";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import { generateAuthError } from "../utils/generateAuthError";
import { loadBasketList } from "./basket";
import { loadfavouriteList } from "./favourite";
import { loadOrdersList } from "./orders";

const initialState = localStorageService.getAccessToken()
    ? {
          entities: [],
          isLoading: true,
          error: null,
          auth: { userId: localStorageService.getUserId() },
          isLoggedIn: true,
          dataLoaded: false
      }
    : {
          entities: [],
          isLoading: false,
          error: null,
          auth: { userId: null },
          isLoggedIn: false,
          dataLoaded: false
      };
const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersReceived: (state, action) => {
            state.entities = [];
            state.entities.push(action.payload);
            state.auth = { userId: localStorageService.getUserId() };
            state.dataLoaded = true;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        usersRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequestSuccess: (state, action) => {
            state.entities = [];
            state.entities.push(action.payload);
            state.isLoggedIn = true;
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload;
        },
        userCreated: (state, action) => {
            state.entities = [];
            state.entities.push(action.payload);
        },
        userLoggedOut: (state) => {
            state.entities = [];
            state.isLoggedIn = false;
            state.auth = null;
            state.dataLoaded = false;
        },
        userlogOutSuccessed: (state) => {
            state.entities = [];
            state.isLoggedIn = false;
            state.auth = [];
            state.dataLoaded = false;
        },
        userUpdateSuccessed: (state, action) => {
            state.entities[
                state.entities.findIndex((u) => u._id === action.payload._id)
            ] = action.payload;
        },
        authRequested: (state) => {
            state.error = null;
        },
        userUpdateRequested: (state) => {
            state.error = null;
        }
    }
});
const { reducer: usersReducer, actions } = usersSlice;
const {
    usersRequested,
    usersReceived,
    usersRequestFailed,
    authRequestSuccess,
    authRequestFailed,
    userCreated,
    userLoggedOut,
    userUpdateSuccessed,
    userlogOutSuccessed
} = actions;

const authRequested = createAction("users/authRequested");
const userCreateRequested = createAction("users/usersReceived");
const createUserFailed = createAction("users/createUserFailed");
const userUpdateRequested = createAction("users/userUpdateRequested");
const userUpdateFailed = createAction("users/userUpdateFailed");

export const login =
    ({ payload }) =>
    async (dispatch) => {
        const { email, password } = payload;
        dispatch(authRequested());
        try {
            const data = await authService.login({ email, password });
            localStorageService.setTokens(data);
            dispatch(authRequestSuccess({ userId: data.userId }));
            const { content } = await userService.postCurrentUser(data.userId);
            dispatch(usersReceived(content));
            dispatch(loadBasketList());
            dispatch(loadfavouriteList());
        } catch (error) {
            const { code, message } = error.response.data.error;
            if (code === 400) {
                const errorMessage = generateAuthError(message);
                dispatch(authRequestFailed(errorMessage));
            } else {
                dispatch(authRequestFailed(error.message));
            }
        }
    };

export const signUp =
    ({ payload }) =>
    async (dispatch) => {
        const { email, password, ...rest } = payload;
        dispatch(authRequested());
        try {
            const data = await authService.register({ payload });
            localStorageService.setTokens(data);
            dispatch(authRequestSuccess({ userId: data.userId }));
            dispatch(
                createUser({
                    _id: data.userId,
                    email,
                    ...rest
                })
            );
        } catch (error) {
            dispatch(authRequestFailed(error.message));
        }
    };
export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData();
    dispatch(userLoggedOut());
    dispatch(loadBasketList());
    dispatch(loadfavouriteList());
    dispatch(loadOrdersList());
    dispatch(userlogOutSuccessed());
};
function createUser(payload) {
    return async function (dispatch) {
        dispatch(userCreateRequested());
        try {
            const { content } = await userService.post(payload._id);
            dispatch(userCreated(content));
        } catch (error) {
            dispatch(createUserFailed(error.message));
        }
    };
}
export const loadUsersList = () => async (dispatch, getState) => {
    dispatch(usersRequested());
    try {
        const { content } = await userService.post(
            localStorageService.getUserId()
        );

        dispatch(usersReceived(content));
    } catch (error) {
        dispatch(usersRequestFailed(error.message));
    }
};
export const updateUser =
    ({ payload }) =>
    async (dispatch) => {
        dispatch(userUpdateRequested());
        try {
            const { content } = await userService.update(payload._id, payload);
            dispatch(userUpdateSuccessed(content));
        } catch (error) {
            dispatch(userUpdateFailed(error.message));
        }
    };

export const getCurrentUserData = () => (state) => {
    return state.users.entities
        ? state.users.entities.find((u) => u._id === state.users.auth.userId)
        : null;
};
export const getUserById = (userId) => (state) => {
    if (state.users.entities) {
        return state.users.entities.find((u) => u._id === userId);
    }
};

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getUserLoadingStatus = () => (state) => state.users.isLoading;
export const getCurrentUserId = () => (state) => state.users.auth.userId;
export const getUsersList = () => (state) => state.users.entities;
export const getAuthErrors = () => (state) => state.users.error;

export default usersReducer;
