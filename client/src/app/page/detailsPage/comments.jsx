import { orderBy } from "lodash";
import React, { useEffect } from "react";
import CommentsList from "./commentsList";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList,
    removeComment
} from "../../store/comments";
import CommentDetails from "./commentDetails";
import Spinner from "../../components/ui/spinner";
const Comments = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadCommentsList(productId));
    }, [productId]);
    const isLoading = useSelector(getCommentsLoadingStatus());
    const comments = useSelector(getComments());
    const handleRemoveComment = (id) => {
        dispatch(removeComment(id));
    };
    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
    return (
        <>
            <div>
                <CommentDetails count={comments.length} />
            </div>
            {sortedComments.length > 0 && (
                <div className="blog__details__comment">
                    <h5>Ваш отзывы</h5>
                    {!isLoading ? (
                        <CommentsList
                            comments={sortedComments}
                            onRemove={handleRemoveComment}
                        />
                    ) : (
                        <Spinner />
                    )}
                </div>
            )}
        </>
    );
};

export default Comments;
