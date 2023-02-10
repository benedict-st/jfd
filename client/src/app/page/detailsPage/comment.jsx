import React from "react";
import PropTypes from "prop-types";
import { displayDate } from "../../utils/displayDate";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../../store/users";
import Picture from "../../components/ui/picture";
const Comment = ({
    comment,
    created_at: created,
    _id: id,
    userId,
    userFio,
    onRemove
}) => {
    const currentUser = useSelector(getCurrentUserId());
    return (
        <>
            <div className="blog__details__comment__item my-flex-cont">
                <div className="my-flex-box">
                    <div className="blog__details__comment__item__pic ">
                        <Picture
                            className="circle"
                            src={`/img/icon/avatar.jpg`}
                            alt="avatar"
                            width="50"
                            height="50"
                        />
                    </div>
                    <div className="blog__details__comment__item__text">
                        <span className="small">{userFio}</span>
                        <span className="small">{displayDate(created)}</span>
                        <p>{comment}</p>
                    </div>
                </div>

                <div className="blog__details__comment__item__text my-flex-box">
                    {currentUser && currentUser === userId && (
                        <button
                            className="btn btn-sm text-warning d-flex align-items-center"
                            onClick={() => onRemove(id)}
                        >
                            <i className="bi bi-x-lg"></i>
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};
Comment.propTypes = {
    comment: PropTypes.string,
    edited_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    userId: PropTypes.string,
    userFio: PropTypes.string,
    onRemove: PropTypes.func,
    _id: PropTypes.string,
    user: PropTypes.string
};
export default Comment;
