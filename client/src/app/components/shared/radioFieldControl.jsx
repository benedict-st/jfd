import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

export default function radioFieldControl({
    control,
    value,
    labelTitle,
    name,
    options,
    type
}) {
    return (
        <>
            <label>
                {labelTitle}
                {options.map((option) => (
                    <div
                        key={option.name + "_" + option.value}
                        className="form-check form-check-inline"
                    >
                        <Controller
                            name={name}
                            value={value}
                            control={control}
                            render={({
                                field: { onChange, value = "" },
                                fieldState: { error }
                            }) => (
                                <>
                                    <input
                                        className="form-check-input"
                                        type={type}
                                        id={option.name + "_" + option.value}
                                        name={name}
                                        checked={option.value === value}
                                        value={option.value}
                                        onChange={onChange}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor={
                                            option.name + "_" + option.value
                                        }
                                    >
                                        {option.name}
                                    </label>
                                    <p className="error-msg">
                                        {error?.message}
                                    </p>
                                </>
                            )}
                        />
                    </div>
                ))}
            </label>
        </>
    );
}

radioFieldControl.propTypes = {
    options: PropTypes.array,
    name: PropTypes.string,
    value: PropTypes.string,
    label: PropTypes.string
};
