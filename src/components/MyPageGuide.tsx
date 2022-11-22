import { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { MYPAGE } from '../Constant';
import InputForm from './moleclues/InputForm';
import { signIn } from '../api/auth';
import { useSelector } from 'react-redux';
import { ReducerType } from '../store/rootReducer';

type TProps = {
  title: string;
  guideTitle: string;
  guide: string[];
  onClick: (idToken: string) => void;
};

const MyPageGuide = ({ title, guideTitle, guide, onClick }: TProps) => {
  const { user } = useSelector((state: ReducerType) => state.auth);
  const [password, setPassword] = useState<string>('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onClickConfirm = async () => {
    const response = await signIn({ email: user.email, password });

    if (response.result) {
      onClick(response.data.idToken);
    } else {
      response.data.error.message === 'INVALID_PASSWORD'
        ? alert('비밀번호가 맞지 않아요.')
        : alert('조회에 실패했습니다.');
    }
  };

  return (
    <main className="mypage__main mypage__main__guide edit__account">
      <h3>{title}</h3>
      <section className="mypage__main__contents">
        <div className="mypage__main__contents__guide">
          <h4>{guideTitle}</h4>
          <p>
            {guide.map((str, i) => (
              <span key={i}>{str}</span>
            ))}
          </p>
        </div>
        <InputForm
          input={{
            id: 'password',
            type: 'password',
            placeholder: '비밀번호를 입력하세요.',
            value: password,
            onChange: onChange,
          }}
          label={{
            htmlFor: 'password',
            className: 'blind',
            children: '비밀번호',
          }}
        />
      </section>
      <div className="mypage__main__button__group">
        <Link to={MYPAGE}>뒤로가기</Link>
        <button onClick={onClickConfirm}>확인</button>
      </div>
    </main>
  );
};

export default MyPageGuide;
