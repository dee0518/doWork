import { Link } from 'react-router-dom';
import { MAIN } from '../Constant';

import Menu from './Menu';

const Header = () => {
  return (
    <header>
      <h1 className="logo">
        <Link to={MAIN}>{/* <img src={images['logo.svg']} alt="dee work" /> */}</Link>
      </h1>
      <Menu />
    </header>
  );
};

export default Header;
