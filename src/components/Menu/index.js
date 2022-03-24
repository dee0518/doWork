import { Link } from 'react-router-dom'
import { MAIN } from '../../navigation/Constant'

function Menu(){
    return (
        <nav>
            <ul>
                <li>
                    <Link to ={MAIN}>
                        schedule
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Menu