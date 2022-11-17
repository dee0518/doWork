import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth';
import { signIn, oAuth, getUserEmail } from '../api/auth';
import { SIGNUP } from '../Constant';
// eslint-disable-next-line import/no-unresolved
import { LoginInfo, UserInfo } from '../types/auth';
import images from '../assets/images/importImage';
import InputForm from '../components/moleclues/InputForm';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState<string>('');
  const [userInfo, setUserInfo] = useState<LoginInfo>({ email: '', password: '' });

  const onClickAuth = async () => {
    const response = await oAuth();
    console.log(response);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const onSubmit = async (e: FormEvent<HTMLInputElement | HTMLFormElement>) => {
    e.preventDefault();

    const response = await signIn(userInfo);

    if (response.result) {
      const getUserResponse = await getUserEmail(response.data.email);
      const [, user] = Object.entries(getUserResponse);
      const [, value] = user;

      dispatch(authActions.setUser(value as UserInfo));
      navigate('/main');
    } else {
      setError(
        response.error.message === 'INVALID_EMAIL'
          ? '같이 일하고 있는 계정이 아니에요 (ㅇㅅㅇ)'
          : '비밀번호가 맞지 않아요 (ㅠ.ㅠ)'
      );
    }
  };

  return (
    <div className="login">
      <h1 className="login__title">
        <img src={images['flat_logo.svg']} alt="do work" />
        <span>doWork</span>
      </h1>
      <p className={`login__msg ${error ? 'error' : ''}`}>{error ? error : '우리 같이 일해 보아요:)'}</p>
      <div className="login__inner">
        <form className="login__form" onSubmit={onSubmit}>
          <InputForm
            input={{
              id: 'email',
              type: 'text',
              name: 'email',
              placeholder: '이메일',
              value: userInfo.email,
              onChange: onChange,
            }}
            label={{ htmlFor: 'email', className: 'blind', children: '이메일' }}
          />
          <InputForm
            input={{
              id: 'password',
              type: 'password',
              name: 'password',
              placeholder: '비밀번호',
              autoComplete: 'off',
              value: userInfo.password,
              onChange: onChange,
            }}
            label={{ htmlFor: 'password', className: 'blind', children: '비밀번호' }}
          />
          <Link className="login__signup" to={SIGNUP}>
            회원가입
          </Link>
          <button className="login__submit" type="submit">
            로그인
          </button>
          {/* <button type="button" className="login__google" onClick={onClickAuth}>
            Google 로그인
          </button> */}
        </form>
      </div>
      <div className="login__copyright">&copy; deeWork {new Date().getFullYear()}</div>
    </div>
  );
};

export default Login;
