import { ChangeEvent, useState } from 'react';
import InputForm from '../components/moleclues/InputForm';

const EditAccountForm = () => {
  const [userInfo, setUserInfo] = useState({
    profile: null,
    email: '',
    name: '',
    password: '',
    career: '',
    introduce: '',
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {};

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
          }}
        />
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
