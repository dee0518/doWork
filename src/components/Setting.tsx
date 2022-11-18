import { Link } from 'react-router-dom';
import { EDITACCOUNT, DELETEACCOUNT } from '../Constant';

const Settings = () => {
  return (
    <main className="mypage__main setting">
      <h3>settings</h3>
      <div className="setting__contents">
        <ul>
          <li>
            <Link to={EDITACCOUNT}>
              <span>edit account</span>
              <span>You can change your name, profile, position.</span>
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
              <span>Your account can deleted.</span>
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default Settings;
