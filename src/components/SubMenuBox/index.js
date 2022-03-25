function SubMenuBox(props){
    const { children } = props
    return (
        <div className="sub-menu-box">
            <h2 className="blind">sub menu</h2>
            {children}
        </div>
    )
}

export default SubMenuBox