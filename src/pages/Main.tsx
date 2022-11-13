// import { useSelector } from 'react-redux';
// import { ReducerType } from '../store/rootReducer';
import Header from '../components/Header';
import Wrapper from '../components/atom/Wrapper';
import SubMenu from '../feature/SubMenu';
import SearchForm from '../feature/SearchForm';
import Calendar from '../feature/Calendar';
import StatusCheckboxList from '../components/moleclues/StatusCheckboxList';
import SelectBox from '../components/moleclues/SelectBox';
import images from '../assets/images/importImage';

const Main = () => {
  // const isLoggedIn = useSelector<ReducerType>(state => state.auth.isLoggedIn);
  const statusList = ['all', 'to do', 'private', 'important', 'metting'];
  return (
    <Wrapper>
      <Header />
      <SubMenu isLinked={true} titles={['calendar', 'schedule']}>
        <Calendar type="small" lang={'en'} strLeng={3} dateType={['year']} />
        <StatusCheckboxList statusList={statusList} />
      </SubMenu>
      <main className="main">
        <SearchForm />
        <div className="main__filter">
          <SelectBox select={{ id: 'calendarType', optionList: ['Day', 'Week', 'Month'] }} />
          <button className="add__schedule-btn">
            <img src={images['ico_add.svg']} alt="+" />
            Add
          </button>
        </div>
        <Calendar type="large" lang={'en'} strLeng={0} dateType={['year']} />
      </main>
    </Wrapper>
  );
};

export default Main;
