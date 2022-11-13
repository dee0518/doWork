import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface SubMenuProps {
  isLinked: boolean;
  titles: string[];
  children: ReactNode;
}

const SubMenu = (props: SubMenuProps) => {
  return (
    <div className="subMenu">
      {props.titles.map(title => (props.isLinked ? <Link to={title.toLowerCase()}>{title}</Link> : <div>{title}</div>))}
      {props.children}
    </div>
  );
};

export default SubMenu;
