import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
const textAreaFieldControl = ({
    label,
    name,
    control,
    value,
    onChange,
    error
}) => {
    return (
        <div className="mb-4">
            <label htmlFor={name}> {label}</label>

            <Controller
                name={name}
                control={control}
                render={({
                    field: { onChange, value = "" },
                    fieldState: { error }
                }) => (
                    <>
                        <textarea
                            className="form-control"
                            id={name}
                            name={name}
                            value={value}
                            onChange={onChange}
                        />
                        <p className="error-msg">{error?.message}</p>
                    </>
                )}
            />
        </div>
    );
};
textAreaFieldControl.defaultProps = {
    type: "text"
};
textAreaFieldControl.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    control: PropTypes.object
};

export default textAreaFieldControl;
