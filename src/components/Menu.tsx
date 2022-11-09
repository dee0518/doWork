import { NavLink } from 'react-router-dom';
import { MAIN, MYPAGE } from '../Constant';

const Menu = () => {
  return (
    <nav>
      <h2 className="blind">Navigataion</h2>
      <ul>
        <li>
          <NavLink to={MAIN} className={({ isActive }) => 'schedule' + (isActive ? ' activated' : '')}>
            <span>Schedule</span>
          </NavLink>
          <NavLink to={MYPAGE} className={({ isActive }) => 'myPage' + (isActive ? ' activated' : '')}>
            <span>My page</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
