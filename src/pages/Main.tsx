import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { scheduleActions } from '../store/schedule';
import { ReducerType } from '../store/rootReducer';
import Header from '../components/Header';
import SubMenu from '../feature/SubMenu';
import SearchForm from '../feature/SearchForm';
import Calendar from '../feature/Calendar';
import StatusCheckboxList from '../components/moleclues/StatusCheckboxList';
import SelectBox from '../components/moleclues/SelectBox';
import NewScheduleModal from '../feature/NewScheduleModal';
import Wrapper from '../components/atom/Wrapper';
import images from '../assets/images/importImage';
import { getScheduleAll } from '../api/schedule';
import { useNavigate } from 'react-router-dom';
import { LOGIN } from '../Constant';
// eslint-disable-next-line import/no-unresolved
import { ScheduleInfo } from '../types/schedule';

const Main = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { statusFilter, selected_at } = useSelector((state: ReducerType) => state.schedule);
  const { user, isLoggedIn } = useSelector((state: ReducerType) => state.auth);

  const [isShowNewSchedule, setIsShowNewSchedule] = useState(false);
  const [scheduleList, setScheduleList] = useState([]);

  useEffect(() => {
    if (isLoggedIn) getSchedule();
    else navigator(LOGIN);
  }, []);

  const getSchedule = async () => {
    const response = await getScheduleAll(user.email);

    if (response.result) {
      const schList = Object.entries(response.data).map(([, value]) => value);
      setScheduleList(schList);
    } else {
      alert('스케쥴 리스트 가져오기 실패');
    }
  };
  const onOpenModal = () => setIsShowNewSchedule(true);
  const onClose = () => {
    getSchedule();
    setIsShowNewSchedule(false);
  };
  const onClickDate = (date: Date) => {
    dispatch(scheduleActions.setSelectedAt(JSON.stringify(date)));
  };
  const onClickHeaderBtn = (date: Date) => {
    dispatch(scheduleActions.setSelectedAt(JSON.stringify(date)));
  };

  return (
    <Wrapper className="main">
      {isShowNewSchedule && <NewScheduleModal onClose={onClose} />}
      <Header />
      <SubMenu title={'schedule'}>
        <Calendar
          date={new Date(selected_at)}
          type="small"
          lang={'en'}
          strLeng={3}
          dateType={['year']}
          onClickDate={onClickDate}
          onClickHeaderBtn={onClickHeaderBtn}
        />
        <StatusCheckboxList statusList={statusFilter} />
      </SubMenu>
      <main className="main__contents">
        <SearchForm />
        <div className="main__filter">
          <SelectBox select={{ id: 'calendarType', optionList: ['Day', 'Week', 'Month'] }} />
          <button className="add__schedule-btn" onClick={onOpenModal}>
            <img src={images['ico_add.svg']} alt="+" />
            Add
          </button>
        </div>
        <Calendar
          date={new Date(selected_at)}
          type="large"
          lang={'en'}
          strLeng={0}
          dateType={['year']}
          scheduleList={scheduleList}
          onClickDate={onClickDate}
          onClickHeaderBtn={onClickHeaderBtn}
        />
      </main>
    </Wrapper>
  );
};

export default Main;
