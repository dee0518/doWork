import { Wrapper, Button } from '../../Path'

function Modal(props){
    const { children, buttonList, onClick } = props

    return (
        <Wrapper className="modal-wrapper">
            <Wrapper className="modal-bg">
                {children}
                {
                    buttonList.length > 0 && buttonList.map((button,i) => {
                        return <Button key={'mb' + i} className={button.className} onClick={onClick}>{button.name}</Button>
                    })
                }
            </Wrapper>
        </Wrapper>
    )
}

export default Modal