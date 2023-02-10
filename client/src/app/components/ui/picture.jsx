import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
export default function Picture({
    src,
    alt,
    name,
    className,
    width,
    height,
    circle,
    ...attrs
}) {
    const classes = classNames(className, { circle });

    if (!src) {
        src = `https://via.placeholder.com/${name}${width}x${height}`;
    }
    return (
        <img
            src={process.env.PUBLIC_URL + src}
            alt={alt}
            className={classes}
            width={width}
            height={height}
            {...attrs}
        />
    );
}
Picture.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    circle: PropTypes.bool,
    name: PropTypes.string,
    className: PropTypes.string
};

Picture.defaultProps = {
    src: "",
    alt: "image",
    width: "100",
    height: "100",
    circle: false,
    className: "",
    name: ""
};
