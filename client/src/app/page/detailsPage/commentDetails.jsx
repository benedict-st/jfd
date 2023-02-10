import React from "react";
import PropTypes from "prop-types";
import AddCommentForm from "../../components/formUI/addComment";
export default function CommentDetails({ count }) {
    const renderPhrase = (number) => {
        const lastOne = Number(number.toString().slice(-1));
        if (number > 4 && number < 15) {
            return "отзыва";
        }
        if (lastOne === 1) return "отзыв";
        if ([2, 3, 4].indexOf(lastOne) >= 0) return "отзыва";
        return "отзыв";
    };
    return (
        <>
            {" "}
            <h5>
                {count > 0
                    ? `${count + " " + renderPhrase(count)} `
                    : "Отзывов пока нет"}
            </h5>
            <div className="card mb-2">
                <div className="card-body ">
                    <AddCommentForm />
                </div>
            </div>
        </>
    );
}
CommentDetails.propTypes = {
    onSubmit: PropTypes.func,
    count: PropTypes.number
};
