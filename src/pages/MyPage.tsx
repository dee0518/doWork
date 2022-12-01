import { Outlet, useNavigate } from 'react-router-dom';
import { LOGIN } from '../Constant';
import { useDispatch, useSelector } from 'react-redux';
import { ReducerType } from '../store/rootReducer';
import { authActions } from '../store/auth';
import Header from '../components/Header';
import Wrapper from '../components/atom/Wrapper';
import SubMenu from '../feature/SubMenu';
import { useEffect } from 'react';

const MyPage = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector((state: ReducerType) => state.auth);

  useEffect(() => {
    if (!isLoggedIn) onLogout();
  }, [isLoggedIn]);

  const onLogout = () => {
    dispatch(authActions.setIsLoggedIn(false));
    dispatch(authActions.setUser(null));
    navigator(LOGIN);
  };

  return (
    <Wrapper className="mypage">
      <Header />
      <SubMenu title={'My page'}>
        <div className="mypage__info__group">
          <div className="mypage__info__profile" aria-label="profile"></div>
          <div className="mypage__info__detail">
            <span className="name">{user.displayName ? user.displayName : 'User'}</span>
            <span className="career">{user.career ? user.career : 'your career'}</span>
          </div>
        </div>
        <ul className="mypage__menu">
          {/* <li>
            <button onClick={onToggleTheme}>dark mode</button>
          </li> */}
          <li>
            <button onClick={onLogout}>logout</button>
          </li>
        </ul>
      </SubMenu>
      <Outlet />
    </Wrapper>
  );
};

export default MyPage;
