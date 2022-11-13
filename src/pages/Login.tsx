import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth';
import { signIn, signUp } from '../api/auth';
import images from '../assets/images/importImage';
import InputForm from '../components/moleclues/InputForm';

interface UserInfo {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoginMode, setIsLoginMode] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [userInfo, setUserInfo] = useState<UserInfo>({ email: '', password: '' });

  const onChangeMode = () => {
    setIsLoginMode(prev => !prev);
    setError('');
    setUserInfo({ email: '', password: '' });
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const onSubmit = async (e: FormEvent<HTMLInputElement | HTMLFormElement>) => {
    e.preventDefault();

    if (isLoginMode) {
      const response = await signIn(userInfo);

      if (response.result) {
        dispatch(authActions.setIsLoggedIn(true));
        navigate('/main');
      } else {
        setError(
          response.error.message === 'INVALID_EMAIL'
            ? '같이 일하고 있는 계정이 아니에요 (ㅇㅅㅇ)'
            : '비밀번호가 맞지 않아요 (ㅠ.ㅠ)'
        );
      }
    } else {
      const response = await signUp(userInfo);

      if (response.result) {
        alert('같이 일할 수 있어 영광입니다(> ㅁ <)! 본격적으로 같이 일할 수 있도록 로그인해주세요.');
        onChangeMode();
      } else {
        setError(
          response.error.message === 'INVALID_EMAIL'
            ? '이메일 형식에 맞게 적어주세요 (^ - ^)'
            : '안전을 위해 6자리 이상 입력해주세요 (> - <)'
        );
      }
    }
  };

  return (
    <div className="login">
      <h1 className="login__title">
        <img src={images['flat_logo.svg']} alt="do work" />
        <span>{isLoginMode ? 'doWork' : 'Sign Up'}</span>
      </h1>
      <p className={`login__msg ${error ? 'error' : ''}`}>
        {error ? error : isLoginMode ? '우리 같이 일해 보아요:)' : '함께 즐거운 일 해볼래요?'}
      </p>
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
          <button className="login__signup" type="button" onClick={onChangeMode}>
            {isLoginMode ? '회원가입' : '로그인'}
          </button>
          <button className="login__submit" type="submit">
            {isLoginMode ? '로그인' : '회원가입'}
          </button>
        </form>
      </div>
      <div className="login__copyright">&copy; deeWork {new Date().getFullYear()}</div>
    </div>
  );
};

export default Login;
