import { Wrapper } from '../../Path'

function SubMenuBox(props){
    const { children } = props
    return (
        <Wrapper className="sub-menu-box">
            <h2 className="blind">sub menu</h2>
            {children}
        </Wrapper>
    )
}

export default SubMenuBox