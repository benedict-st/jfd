import { createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: [],
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        commentCreatedFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentDeleteSuccessed: (state, action) => {
            state.entities = state.entities.filter(
                (el) => el._id !== action.payload
            );
            state.isLoading = false;
        },

        commentDeleteFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequested,
    commentsReceived,
    commentsRequestFailed,
    commentDeleteFailed,
    commentDeleteSuccessed,
    commentCreated,
    commentCreatedFailed
} = actions;

export const loadCommentsList = (productId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(productId);
        dispatch(commentsReceived(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};
export function createComment(payload) {
    return async function (dispatch) {
        try {
            const { content } = await commentService.createComment(payload);
            dispatch(commentCreated(content));
        } catch (error) {
            dispatch(commentCreatedFailed(error.message));
        }
    };
}
export function removeComment(payload) {
    return async function (dispatch) {
        try {
            const { content } = await commentService.removeComment(payload);
            if (content === "ok") {
                dispatch(commentDeleteSuccessed(payload));
            }
        } catch (error) {
            dispatch(commentDeleteFailed(error.message));
        }
    };
}
export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export default commentsReducer;
