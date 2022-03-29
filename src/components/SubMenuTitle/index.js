function SubMenuTitle (props){
    const { type, titles, curTitle } = props

    const onClick = (e) => {
        props.onClickSubTitle(e.target.textContent)
    }

    return (
        <div className="sub-menu-title-group">
            { type === 'text' && titles[0] }
            {
                type === 'button' && 
                titles.map((title, i) => {
                    let activeClass = ''
                    if(title === curTitle || (curTitle === undefined && i === 0)){
                        activeClass = ' on'
                    }

                    return <button className={'title' + activeClass} key={'st' + i} onClick={(e) => onClick(e)}>{title}</button>
                })
            }
        </div>
    )
}

export default SubMenuTitle