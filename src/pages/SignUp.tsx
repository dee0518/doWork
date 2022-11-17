import { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-unresolved
import { SignUpInfo } from '../types/auth';
import { postUser, signUp } from '../api/auth';
import { LOGIN } from '../Constant';
import images from '../assets/images/importImage';
import InputForm from '../components/moleclues/InputForm';

const SignUp = () => {
  const navigator = useNavigate();
  const [error, setError] = useState<string>('');
  const [userInfo, setUserInfo] = useState<SignUpInfo>({
    email: '',
    password: '',
    displayName: '',
    career: '',
    profile: '',
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const onSubmit = async (e: FormEvent<HTMLInputElement | HTMLFormElement>) => {
    e.preventDefault();

    if (userInfo.displayName.trim() === '' || userInfo.career.trim() === '') {
      const name = userInfo.displayName.trim() === '' ? '이름' : '직업';
      setError(`${name}을 입력해주세요:) `);
      return;
    }

    const { email, password, displayName, career, profile } = userInfo;

    const response = await signUp({ email, password });

    if (response.result) {
      const postResponse = await postUser({ email, displayName, career, profile });
      if (postResponse.result) {
        alert('함께 해서 반가워요(> ㅁ <)! 이제 로그인을 통해 같이 일해보아요.');
        navigator(LOGIN);
      } else {
        alert('회원가입에 실패했어요ㅠ.ㅠ 다시 가입해주세요.');
      }
    } else {
      setError(
        response.error.message === 'INVALID_EMAIL'
          ? '이메일 형식에 맞게 적어주세요 (^ - ^)'
          : '안전을 위해 6자리 이상 입력해주세요 (> - <)'
      );
    }
  };

  return (
    <div className="login">
      <h1 className="login__title">
        <img src={images['flat_logo.svg']} alt="do work" />
        <span>Sign Up</span>
      </h1>
      <p className={`login__msg ${error ? 'error' : ''}`}>{error ? error : '함께 즐거운 일 해볼래요?'}</p>
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
          <InputForm
            input={{
              id: 'displayName',
              type: 'text',
              name: 'displayName',
              placeholder: '이름',
              value: userInfo.displayName,
              onChange: onChange,
            }}
            label={{ htmlFor: 'displayName', className: 'blind', children: '이름' }}
          />
          <InputForm
            input={{
              id: 'career',
              type: 'text',
              name: 'career',
              placeholder: '직업',
              value: userInfo.career,
              onChange: onChange,
            }}
            label={{ htmlFor: 'career', className: 'blind', children: '직업' }}
          />
          <Link className="login__signup" to={LOGIN}>
            뒤로 가기
          </Link>
          <button className="login__submit" type="submit">
            회원가입
          </button>
        </form>
      </div>
      <div className="login__copyright">&copy; deeWork {new Date().getFullYear()}</div>
    </div>
  );
};

export default SignUp;
