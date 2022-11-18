import { useDispatch, useSelector } from 'react-redux';
import { ReducerType } from '../store/rootReducer';
import images from '../assets/images/importImage';
import { ChangeEvent, FormEvent } from 'react';
import { scheduleActions } from '../store/schedule';

const SearchForm = () => {
  const dispatch = useDispatch();
  const { searchKeyword } = useSelector((state: ReducerType) => state.schedule);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(scheduleActions.setSearchKeyword(e.target.value));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <form method="POST" className="search-form" onSubmit={onSubmit}>
      <input type="text" value={searchKeyword} placeholder="일정을 찾아볼까요." onChange={onChange} />
      <button type="submit">
        <img src={images['ico_search.svg']} alt="검색" />
      </button>
    </form>
  );
};

export default SearchForm;
