import React from "react";
import "./custom-select.css";

const customSelect = props => {
    return (
        <div>
            <input
                className="customSelect-input"
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.valueChange}
            ></input>
        </div>
    );
};

export default customSelect;
