import { useState, ChangeEvent } from 'react';
import images from '../assets/images/importImage';

const SearchForm = () => {
  const [value, setValue] = useState<string>('');
  const onChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
  return (
    <form method="POST" className="search-form">
      <input type="text" value={value} placeholder="일정을 찾아볼까요." onChange={onChange} />
      <button type="submit">
        <img src={images['ico_search.svg']} alt="검색" />
      </button>
    </form>
  );
};

export default SearchForm;
