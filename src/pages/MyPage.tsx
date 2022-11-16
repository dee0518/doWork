import { Link } from 'react-router-dom';
import { LOGIN } from '../Constant';
import Header from '../components/Header';
import SubMenu from '../feature/SubMenu';

const MyPage = () => {
  const userObj = {
    displayName: 'sdf',
    career: 'sdfsdf',
  };
  const onLogout = () => {};
  const onOpenModal = () => {};
  const onToggleTheme = () => {};

  return (
    <div className="mypage">
      <Header />
      <SubMenu title={'My page'}>
        <div className="mypage__info__group">
          <div className="mypage__info__profile">profile image</div>
          <div className="mypage__info__detail">
            <span className="name">{userObj.displayName ? userObj.displayName : 'User'}</span>
            <span className="career">{userObj.career ? userObj.career : 'your career'}</span>
          </div>
        </div>
        <ul className="mypage__menu">
          <li>
            <Link to={LOGIN} onClick={() => onLogout()}>
              logout
            </Link>
          </li>
          <li>
            <button onClick={onToggleTheme}>Dark Theme</button>
          </li>
        </ul>
      </SubMenu>
      <main className="setting">
        <h3>settings</h3>
        <div className="setting__nav">
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
    </div>
  );
};

export default MyPage;
