import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const TableBody = ({ data, columns }) => {
    const renderContent = (item, column) => {
        if (columns[column].component) {
            const component = columns[column].component;

            if (typeof component === "function") {
                return component(item);
            }
            return component;
        }

        return _.get(item, columns[column].path);
    };
    if (!Array.isArray(data)) {
        return (
            <tbody>
                {data.map((item) => (
                    <tr key={item._id}>
                        {Object.keys(columns).map((column) => (
                            <td key={column}>{renderContent(item, column)}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        );
    }

    return (
        <tbody>
            {Object.entries(data).map(([key, value]) => (
                <tr key={data[key]._id}>
                    {Object.keys(columns).map((column) => (
                        <td key={column}>{renderContent(data[key], column)}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};

TableBody.propTypes = {
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    columns: PropTypes.object.isRequired
};

export default TableBody;
