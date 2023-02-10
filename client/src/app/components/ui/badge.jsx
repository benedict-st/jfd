import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export default function Badge({
    value,
    circle,
    className,
    inline,
    outer,
    inscription,
    ...attrs
}) {
    const text = typeof value === "string" || value instanceof String;

    const classes = classNames(
        "badge",
        { circle },
        className,
        { inline },
        { outer },
        { text },
        { warning: attrs.warning },
        { alert: attrs.alert },
        { success: attrs.success },
        { info: attrs.info }
    );

    return (
        <div>
            <span className={classes}>
                {value} {inscription}
            </span>
        </div>
    );
}

Badge.propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    circle: PropTypes.bool,
    className: PropTypes.string,
    inscription: PropTypes.string,
    inline: PropTypes.bool,
    outer: PropTypes.bool
};

Badge.defaultProps = {
    circle: false,
    className: "",
    inscription: "",
    inline: false,
    outer: false
};
