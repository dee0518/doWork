import { Menu, images } from '../../Path'

function Header(){
    return (
        <header>
            <h1 className='logo'>
                <img src={images['logo.svg']} alt="dee work"/>
            </h1>
            <Menu/>
        </header>
    )
}

export default Header