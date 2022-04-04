import { Wrapper } from '../../Path'

function InputTextForm(props){
    const { id, name, placeholder, value, onChange, labelClass, labelText } = props

    return (
        <Wrapper className="input-form">
            <label htmlFor={id} className={labelClass}>{labelText}</label>
            <input id={id} type="text" name={name} placeholder={placeholder} onChange={(e) => onChange(e)} value={value}/>
        </Wrapper>
    )
}

export default InputTextForm