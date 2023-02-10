import React from "react";
import PropTypes from "prop-types";
import Button from "../ui/button";
import Icon from "../ui/icon";

export default function Modal({
    title,
    isOpen,
    onCancel,
    onSubmit,
    body,
    disable
}) {
    return (
        <>
            {isOpen && (
                <>
                    <div className="modalOverlay">
                        <div className="modalWindow">
                            <div className="modalHeader">
                                <div className="modalTitle">{title}</div>
                                <Icon name="x" onClick={onCancel} />
                            </div>
                            <div className="modalBody">{body}</div>
                            <div className="modalFooter">
                                {!disable ? (
                                    <Button
                                        onClick={onSubmit}
                                        className="primary-btn"
                                    >
                                        Детали заказа
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={onSubmit}
                                        className="primary-btn"
                                    >
                                        Отменить заказ
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

Modal.propTypes = {
    title: PropTypes.string,
    isOpen: PropTypes.bool,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
    body: PropTypes.string,
    disable: PropTypes.bool
};

Modal.defaultProps = {
    title: "Modal title",
    isOpen: false,
    onCancel: () => {},
    onSubmit: () => {},
    children: null,
    disable: false
};
