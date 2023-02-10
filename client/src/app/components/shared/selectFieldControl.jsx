import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
const SelectField = ({
    control,
    label,
    value,
    defaultOption,
    options,
    error,
    name
}) => {
    const getInputClasses = () => {
        return "form-select" + (error ? " is-invalid" : "");
    };

    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.values(options)
            : options;

    return (
        <>
            <div>
                <Controller
                    name={name}
                    value={value}
                    control={control}
                    render={({
                        field: { onChange, value = "" },
                        fieldState: { error }
                    }) => (
                        <>
                            <label htmlFor={name} className="form-label">
                                {label}
                            </label>
                            <select
                                className={getInputClasses()}
                                id={name}
                                name={name}
                                value={value}
                                onChange={onChange}
                            >
                                <option disabled value="">
                                    {defaultOption}
                                </option>
                                {optionsArray.length > 0 &&
                                    optionsArray.map((option) => (
                                        <option
                                            value={option.value}
                                            key={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                            </select>
                            <p className="error-msg">{error?.message}</p>
                        </>
                    )}
                />
            </div>
        </>
    );
};

SelectField.propTypes = {
    defaultOption: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    name: PropTypes.string,
    control: PropTypes.object
};

export default SelectField;
