import images from '../assets/images/importImage';
import InputForm from '../components/moleclues/InputForm';

const Login = () => {
  return (
    <div className="login">
      <h1 className="login__title">
        <img src={images['logo.svg']} alt="do work" />
        <span>doWork</span>
      </h1>
      <div className="login__inner">
        <form className="login__form">
          <InputForm
            input={{ id: 'email', type: 'text', name: 'email', placeholder: '이메일' }}
            label={{ htmlFor: 'email', className: 'blind', children: '이메일' }}
          />
          <InputForm
            input={{ id: 'password', type: 'password', name: 'password', placeholder: '비밀번호', autoComplete: 'off' }}
            label={{ htmlFor: 'password', className: 'blind', children: '비밀번호' }}
          />
          <button className="login__signup">회원가입</button>
          <button className="login__submit" type="submit">
            로그인
          </button>
        </form>
        <div className="login__auth">
          <button className="login__auth-btn">Google 로그인</button>
        </div>
      </div>
      <div className="login__copyright">&copy; deeWork {new Date().getFullYear()}</div>
    </div>
  );
};

export default Login;
