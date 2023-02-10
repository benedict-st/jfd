import { createSlice } from "@reduxjs/toolkit";
import CategoriesService from "../services/categories.service";

const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        categoriesRequested: (state) => {
            state.isLoading = true;
        },
        categoriesReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        categoriesRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: categoriesReduser, actions } = categoriesSlice;
const { categoriesRequested, categoriesReceved, categoriesRequestFiled } =
    actions;

export const loadCategoriesList = () => async (dispatch, getState) => {
    dispatch(categoriesRequested());
    try {
        const { content } = await CategoriesService.fetchAll();
        dispatch(categoriesReceved(content));
    } catch (error) {
        dispatch(categoriesRequestFiled(error.message));
    }
};
export const getCategoriesById = (categoriesId) => (state) => {
    if (state.categories.entities) {
        const categoriesArray = [];
        for (const cat of state.categories.entities) {
            if (cat._id === categoriesId) {
                categoriesArray.push(cat);
                break;
            }
        }
        return categoriesArray[0];
    }
    return [];
};
export const getCategoriesList = () => (state) => state.categories.entities;
export const getCategoriesLoadingStatus = () => (state) =>
    state.categories.isLoading;

export default categoriesReduser;
