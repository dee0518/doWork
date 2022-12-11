import { ChangeEvent, useState } from 'react';
import InputForm from '../components/moleclues/InputForm';

const EditAccountForm = () => {
  const [userInfo, setUserInfo] = useState({
    profile: null,
    email: 'dehya0518@naver.com',
    name: '황도은',
    password: '',
    career: '',
    introduce: '',
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form className="edit__account__form">
      <div className="edit__account__form__profile">
        <InputForm
          input={{
            id: 'profile',
            type: 'file',
            name: 'profile',
            value: userInfo.profile,
            onChange: onChange,
          }}
          label={{
            htmlFor: 'profile',
            children: '파일 선택',
          }}
        />
        <div className="email">
          <p>
            <span>email</span>
            <span>{userInfo.email}</span>
          </p>
        </div>
      </div>
      <div className="edit__account__form__greeting">
        <p>
          <span>안녕하세요.</span>
          <span>저는 {userInfo.name}입니다.</span>
        </p>
      </div>
      <div className="edit__account__form__info">
        <InputForm
          input={{
            id: 'password',
            type: 'password',
            name: 'password',
            placeholder: '비밀번호를 입력해주세요.',
            value: userInfo.password,
            onChange: onChange,
          }}
          label={{
            htmlFor: 'password',
            children: 'password',
          }}
        />
        <InputForm
          input={{
            id: 'name',
            type: 'text',
            name: 'name',
            value: userInfo.name,
            placeholder: '비밀번호를 입력하세요.',
            onChange: onChange,
          }}
          label={{
            htmlFor: 'name',
            children: 'name',
          }}
        />
        <InputForm
          input={{
            id: 'career',
            type: 'text',
            name: 'career',
            value: userInfo.career,
            placeholder: '나의 직업은 무엇인가요?',
            onChange: onChange,
          }}
          label={{
            htmlFor: 'career',
            children: 'career',
          }}
        />
        <InputForm
          input={{
            id: 'introduce',
            type: 'text',
            name: 'introduce',
            placeholder: '나를 소개해주세요.',
            value: userInfo.introduce,
            onChange: onChange,
          }}
          label={{
            htmlFor: 'introduce',
            children: 'introduce',
          }}
        />
      </div>
    </form>
  );
};

export default EditAccountForm;
