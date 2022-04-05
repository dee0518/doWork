import React from "react";

function Button(props){
    const { className, children } = props

    return (
        <button type="button" className={className} onClick={(e) => props.onClick(e)}>{children}</button>
    )
}

export default Button