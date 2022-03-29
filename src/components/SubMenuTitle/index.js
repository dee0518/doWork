function SubMenuTitle (props){
    const { type, titles, curTitle } = props

    const onClick = (e) => {
        props.onClickSubTitle(e.target.textContent)
    }

    return (
        <div className="sub-menu-title-group">
            { type === 'text' && <span className="title">{titles[0]}</span> }
            {
                type === 'button' && 
                titles.map((title, i) => {
                    let activeClass = ''
                    
                    if(curTitle === title){
                        activeClass = ' on'
                    }
                    return <button className={"title" + activeClass} key={'st' + i} onClick={(e) => onClick(e)}>{title}</button>
                })
            }
        </div>
    )
}

export default SubMenuTitle