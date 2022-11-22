import MyPageGuide from '../components/MyPageGuide';
import { useState } from 'react';
import EditAccountForm from '../feature/EditAccountForm';

const EditAccount = () => {
  const [isEdited, setIsEdited] = useState<boolean>(false);

  const onClick = () => {
    setIsEdited(true);
  };

  return (
    <section className="edit__account">
      <h2 className="blind">Edit form</h2>
      <MyPageGuide
        title={'edit account'}
        guideTitle={'나는 어떤 사람인가요?'}
        guide={['같이 일하는 사람들에게 나를 소개해주세요', '새로운 정보를 업데이트 해주세요']}
        onClick={onClick}
      />
      {isEdited && <EditAccountForm />}
    </section>
  );
};

export default EditAccount;
