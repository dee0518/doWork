import { Link } from 'react-router-dom';
import { EDITACCOUNT, DELETEACCOUNT } from '../Constant';

const Settings = () => {
  return (
    <main className="mypage__main setting">
      <h3>settings</h3>
      <div className="mypage__main__contents">
        <ul>
          <li>
            <Link to={EDITACCOUNT}>
              <span>edit account</span>
              <span>나를 소개하는 정보를 수정할 수 있어요</span>
            </Link>
          </li>
          {/* <li>
            <Link to={'changePw'}>
              <span>change password</span>
              <span>You can change your password</span>
            </Link>
          </li> */}
          <li>
            <Link to={DELETEACCOUNT}>
              <span>Delete Account</span>
              <span>같이 일하시는 게 어려우시면 계정 삭제를 할 수 있어요</span>
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default Settings;
