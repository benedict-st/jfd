import React from "react";
import PropTypes from "prop-types";
import BasketIcon from "../ui/basketIcon";
import _ from "lodash";
export default function BaskerNavBar({ items }) {
    const isEmpty = _.isEmpty(items);
    let summaItog = 0;
    if (isEmpty !== true) {
        if (items.length !== 0) {
            const basketSumma = items.reduce(function (
                previousValue,
                currentValue
            ) {
                return {
                    summa:
                        Number(previousValue.summa) + Number(currentValue.summa)
                };
            });
            summaItog = basketSumma.summa;
        }
    }
    return (
        <>
            {summaItog > 0 ? (
                <>
                    <div className="my-flex-cont">
                        <div className="my-flex-box">
                            <BasketIcon status={true} />
                        </div>
                        <div className="my-flex-box ">
                            <span>{summaItog} руб.</span>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="my-flex-cont">
                        <div className="my-flex-box">
                            <BasketIcon status={false} />
                        </div>
                        <div className="my-flex-box">
                            <span>0.00 руб.</span>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

BaskerNavBar.propTypes = {
    items: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
