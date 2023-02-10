import React from "react";

export default function SpinnerRender() {
    return (
        <div className="preloader">
            <div className="preloader__image">
                <div className="spinner-grow text-warning" role="status"></div>
            </div>
        </div>
    );
}
