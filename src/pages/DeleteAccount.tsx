import { useNavigate } from 'react-router-dom';
import { LOGIN } from '../Constant';
import MyPageGuide from '../components/MyPageGuide';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth';
import { deleteAcoount } from '../api/auth';

const DeleteAccount = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const onClick = async (idToken: string) => {
    const response = await deleteAcoount(idToken);

    if (response.result) {
      dispatch(authActions.setIsLoggedIn(false));
      dispatch(authActions.setUser(null));
      navigator(LOGIN);
    } else {
      alert('계정을 삭제하지 못했어요. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <MyPageGuide
      title={'delete account'}
      guideTitle={'마지막 doWork'}
      guide={['아직 doWork와의 즐거움을 차지 못했군요ㅠ.ㅠ', '떠나면 더이상 같이 일할 수 었어요. 떠날실 건가요?']}
      onClick={onClick}
      isEdited={true}
    />
  );
};

export default DeleteAccount;
