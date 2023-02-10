import React, { useState, useEffect, useRef } from "react";
import Button from "../../components/ui/button";

export default function AddCountCard() {
    const [count, setCount] = useState(0);
    const prevRef = useRef(count);
    useEffect(() => {
        prevRef.current = count;
    }, [count]);

    const decrement = () => {
        if (prevRef.current > 0) {
            setCount(count - 1);
        }
    };
    const increment = () => {
        setCount(count + 1);
    };

    return (
        <>
            <div className="pro-qty">
                <div className="d-flex flex-row justify-content-center">
                    <div className="d-flex align-items-center">
                        <Button onClick={decrement} className="dec qtybtn">
                            -
                        </Button>
                    </div>

                    <div className="d-flex align-items-center">
                        <span>{count}</span>
                    </div>
                    <div className="d-flex align-items-center">
                        <Button className="inc qtybtn" onClick={increment}>
                            +
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
