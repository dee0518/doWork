import { Wrapper } from '../../Path'

function SelectBox(props){
    const { list, value, onChange } = props

    return (
        <Wrapper className="select-box-group">
            <select value={value} onChange={(e) => onChange(e)}>
                {
                    list.map((item, i) => <option key={'s' + i} value={item}>{item}</option>)
                }
            </select>
        </Wrapper>
    )
}

export default SelectBox