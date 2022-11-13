// import { useSelector } from 'react-redux';
// import { ReducerType } from '../store/rootReducer';
import Header from '../components/Header';
import Wrapper from '../components/atom/Wrapper';
import SubMenu from '../feature/SubMenu';
import SearchForm from '../feature/SearchForm';
import Calendar from '../feature/Calendar';
import StatusCheckboxList from '../components/moleclues/StatusCheckboxList';

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
        <Calendar type="large" lang={'en'} strLeng={0} dateType={['year']} />
      </main>
    </Wrapper>
  );
};

export default Main;
