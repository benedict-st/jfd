import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
export default function InputField({
    control,
    labelTitle,
    name,
    options,
    type,
    disabled,
    min,
    max
}) {
    return (
        <>
            <label>
                {labelTitle}
                <Controller
                    name={name}
                    control={control}
                    defaultValue={options}
                    render={({
                        field: { onChange, value = "" },
                        fieldState: { error }
                    }) => (
                        <>
                            {disabled === "disabled" ? (
                                <>
                                    <input
                                        disabled
                                        type={type}
                                        value={value}
                                        onChange={onChange}
                                        min={min}
                                        max={max}
                                    />
                                    <p className="error-msg">
                                        {error?.message}
                                    </p>
                                </>
                            ) : (
                                <>
                                    <input
                                        type={type}
                                        value={value}
                                        onChange={onChange}
                                        min={min}
                                        max={max}
                                    />
                                    <p className="error-msg">
                                        {error?.message}
                                    </p>
                                </>
                            )}
                        </>
                    )}
                />
            </label>
        </>
    );
}
InputField.defaultProps = {
    type: "text"
};
InputField.propTypes = {
    labelTitle: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    options: PropTypes.string,
    disabled: PropTypes.string,
    control: PropTypes.object,
    min: PropTypes.string,
    max: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
