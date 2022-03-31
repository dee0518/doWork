import { NavLink } from 'react-router-dom'
import { MAIN } from '../../navigation/Constant'

function Menu(){
    return (
        <nav>
            <h2 className='blind'>Navigataion</h2>
            <ul>
                <li>
                    <NavLink to={'main'}
                        className={({ isActive }) => 'schedule'+ (isActive ? ' activated' : '')}>
                        <span>Schedule</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Menu


// 로드가 다 되면 전체적으로 보라색의 DeeWork글씨가 보이고
// 넓이가 줄어들면서 메뉴들이 보이고 왼쪽메뉴가 슬라이드되고
// 나머지 opacity가 0 -> 1로 변경
