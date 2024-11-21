import React from "react";
import PropType from "prop-types";

import "./button.css";

const Button = props => {
    return (
        <button
            className={`btn ${props.className}`}
            onClick = {props.onClick ? () => props.onClick() : null}
        >
            {props.children}
        </button>
    )
}

export const OutlineButton = props => {
    return (
        <Button
            className={`btn-outline ${props.className}`}
            onClick = {props.onClick ? () => props.onClick() : null}
        >
            {props.children}
        </Button>
    )
}


Button.propTypes = {
    onClick: PropType.func,
}

export default Button;