import MyPageGuide from '../components/MyPageGuide';
import { useState } from 'react';
import EditAccountForm from '../feature/EditAccountForm';

const EditAccount = () => {
  const [guide, setGuide] = useState({
    title: '나는 어떤 사람인가요?',
    content: ['같이 일하는 사람들에게 나를 소개해주세요', '새로운 정보를 업데이트 해주세요'],
  });
  const [isEdited, setIsEdited] = useState<boolean>(false);

  const onClick = () => {
    setIsEdited(true);
    setGuide({
      title: '나를 소개해봐요',
      content: ['같이 일하는 사람들에게 나를 소개해봐요', '새로운 정보를 업데이트해봐요'],
    });
  };

  return (
    <section className="edit__account">
      <h2 className="blind">Edit form</h2>
      <MyPageGuide
        title={'edit account'}
        guideTitle={guide.title}
        guide={guide.content}
        onClick={onClick}
        isEdited={isEdited}>
        {isEdited && <EditAccountForm />}
      </MyPageGuide>
    </section>
  );
};

export default EditAccount;
