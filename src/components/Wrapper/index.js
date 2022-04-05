import React from "react";

function Wrapper(props){
    const {className, children} = props

    return (
        <div className={className}>
            {children}
        </div>
    )
}

export default Wrapper