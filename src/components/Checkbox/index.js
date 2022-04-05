import React from "react";

function Checkbox(props){
    const { name, info, onChange } = props

    return (
        <div className="check-box-group">
            <input id={name + '_' +info.id} type="checkbox" name={name} checked={info.checked} onChange={(e) => onChange(e)}/>
            <label htmlFor={name + '_' +info.id} className={info.color}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {!info.checked && <rect x="0.5" y="0.5" width="19" height="19" rx="2.5" fill="white" stroke="#CACACA" strokeWidth="1"/>}
                    {info.checked && <rect width="20" height="20" rx="3"/>}
                    {info.checked && <path d="M4 10.1538L9.07692 14.7692L16 6" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>}
                </svg>
                {info.label}
            </label>
        </div>
    )
}   

export default Checkbox