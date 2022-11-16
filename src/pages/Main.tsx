// import { useSelector } from 'react-redux';
// import { ReducerType } from '../store/rootReducer';
import Header from '../components/Header';
import SubMenu from '../feature/SubMenu';
import SearchForm from '../feature/SearchForm';
import Calendar from '../feature/Calendar';
import StatusCheckboxList from '../components/moleclues/StatusCheckboxList';
import SelectBox from '../components/moleclues/SelectBox';
import images from '../assets/images/importImage';
import NewScheduleModal from '../feature/NewScheduleModal';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { scheduleActions } from '../store/schedule';
import { ReducerType } from '../store/rootReducer';

const Main = () => {
  // const isLoggedIn = useSelector<ReducerType>(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const { statusFilter, selected_at } = useSelector((state: ReducerType) => state.schedule);

  const [isShowNewSchedule, setIsShowNewSchedule] = useState(false);

  const onOpenModal = () => setIsShowNewSchedule(true);
  const onClose = () => setIsShowNewSchedule(false);
  const onClickDate = (date: Date) => {
    dispatch(scheduleActions.setSelectedAt(JSON.stringify(date)));
  };
  const onClickHeaderBtn = (date: Date) => {
    dispatch(scheduleActions.setSelectedAt(JSON.stringify(date)));
  };

  return (
    <div className="main">
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
          onClickDate={onClickDate}
          onClickHeaderBtn={onClickHeaderBtn}
        />
      </main>
    </div>
  );
};

export default Main;
