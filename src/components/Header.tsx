import { Link } from 'react-router-dom';
import { MAIN } from '../Constant';
import images from '../assets/images/importImage';

import Menu from './Menu';

const Header = () => {
  return (
    <header>
      <h1 className="logo">
        <Link to={MAIN}>
          <img src={images['flat_logo.svg']} alt="do work" />
        </Link>
      </h1>
      <Menu />
    </header>
  );
};

export default Header;
