import { Link } from 'react-router'

function Menu(){
    return (
        <nav>
            <ul>
                <li>
                    <Link to ="schedule"></Link>
                </li>
            </ul>
        </nav>
    )
}

export default Menu