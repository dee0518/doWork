import { Link } from 'react-router-dom';
import { LOGIN } from '../Constant';
import Header from '../components/Header';
import SubMenu from '../feature/SubMenu';
import Wrapper from '../components/atom/Wrapper';

const MyPage = () => {
  const userObj = {
    displayName: 'sdf',
    career: 'sdfsdf',
  };
  const onLogout = () => {};
  const onOpenModal = () => {};
  const onToggleTheme = () => {};

  return (
    <Wrapper className="mypage">
      <Header />
      <SubMenu title={'My page'}>
        <div className="mypage__info__group">
          <div className="mypage__info__profile" aria-label="profile"></div>
          <div className="mypage__info__detail">
            <span className="name">{userObj.displayName ? userObj.displayName : 'User'}</span>
            <span className="career">{userObj.career ? userObj.career : 'your career'}</span>
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
      <main className="setting">
        <h3>settings</h3>
        <div className="setting__contents">
          <ul>
            <li>
              <Link to={'editProfile'}>
                <span>edit profile</span>
                <span>You can change your name, profile, position.</span>
              </Link>
            </li>
            <li>
              <Link to={'changePw'}>
                <span>change password</span>
                <span>You can change your password</span>
              </Link>
            </li>
            <li>
              <Link to={'settings'} onClick={onOpenModal}>
                <span>Delete Account</span>
                <span>Your account can deleted.</span>
              </Link>
            </li>
          </ul>
        </div>
      </main>
    </Wrapper>
  );
};

export default MyPage;
