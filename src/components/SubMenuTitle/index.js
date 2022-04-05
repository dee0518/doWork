import React from "react";
import { Button, Wrapper } from '../../Path'

function SubMenuTitle (props){
    const { type, titles, curTitle } = props

    const onClick = (e) => {
        props.onClickSubTitle(e.target.textContent)
    }

    return (
        <Wrapper className="sub-menu-title-group">    
            { type === 'text' && <h2>{titles[0]}</h2>}
            {
                type === 'button' && 
                titles.map((title, i) => {
                    let activeClass = ''
                    if(title === curTitle || (curTitle === undefined && i === 0)){
                        activeClass = ' on'
                    }

                    return <Button className={'title' + activeClass} key={'st' + i} onClick={onClick}>{title}</Button>
                })
            }
        </Wrapper>
    )
}

export default SubMenuTitle