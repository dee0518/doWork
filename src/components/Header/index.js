import React from "react";
import { Link } from 'react-router-dom'
import { MAIN } from '../../navigation/Constant'
import { Menu, images } from '../../Path'

function Header(){
    return (
        <header>
            <h1 className='logo'>
                <Link to={MAIN}>
                    <img src={images['logo.svg']} alt="dee work"/>
                </Link>
            </h1>
            <Menu/>
        </header>
    )
}

export default Header