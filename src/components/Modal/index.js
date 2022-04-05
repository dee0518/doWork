import React from "react";
import { Wrapper, Button, images } from '../../Path'

function Modal(props){
    const { children, type, buttonList, onClick } = props

    return (
        <Wrapper className="modal-wrapper">
            <Wrapper className={"modal-bg " + (type? type : '')}>
                {type && <img src={images['ico_warn.svg']} alt="warn"/>}
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