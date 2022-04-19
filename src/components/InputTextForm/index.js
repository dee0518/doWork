import React from "react";
import { Wrapper } from '../../Path'

function InputTextForm(props){
    const { id, name, type, placeholder, autoComplete, value, onChange, labelClass, labelText } = props

    return (
        <Wrapper className="input-form">
            <label htmlFor={id} className={labelClass}>{labelText}</label>
            <input id={id} type={type? type : 'text'} autoComplete={autoComplete || 'on'} name={name} placeholder={placeholder} onChange={(e) => onChange(e)} value={value}/>
        </Wrapper>
    )
}

export default InputTextForm