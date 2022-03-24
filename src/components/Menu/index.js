import { NavLink } from 'react-router-dom'
import { MAIN } from '../../navigation/Constant'

function Menu(){
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to={MAIN} className={({ isActive }) => 'schedule'+ (isActive ? ' activated' : '')}>
                        <span>Schedule</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Menu