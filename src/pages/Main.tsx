// import { useSelector } from 'react-redux';
// import { ReducerType } from '../store/rootReducer';
import Header from '../components/Header';
import Wrapper from '../components/atom/Wrapper';
import SubMenu from '../components/SubMenu';
import SearchForm from '../feature/SearchForm';
import Calendar from '../feature/Calendar';

const Main = () => {
  // const isLoggedIn = useSelector<ReducerType>(state => state.auth.isLoggedIn);
  return (
    <Wrapper>
      <Header />
      <SubMenu isLinked={true} titles={['Calendar', 'Schedule']}>
        <Calendar type="small" lang={'en'} strLeng={3} dateType={['year']} />
      </SubMenu>
      <main className="main">
        <SearchForm />
        <Calendar type="large" lang={'en'} strLeng={0} dateType={['year']} />
      </main>
    </Wrapper>
  );
};

export default Main;
