import React from "react";
import { Wrapper } from '../../Path'

function SelectBox(props){
    const { id, labelClass, labelText, list, value, onChange } = props

    return (
        <Wrapper className="select-box-group">
            <label htmlFor={id} className={labelClass}>{labelText}</label>
            <select id={id} name={id} value={value === undefined? 'month': value} onChange={(e) => onChange(e)}>
                {
                    list.map((item, i) => <option key={id + i} value={item.toLowerCase()}>{item}</option>)
                }
            </select>
        </Wrapper>
    )
}

export default SelectBox