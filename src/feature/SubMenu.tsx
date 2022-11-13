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
      <div className="subMenu__title__group">
        {props.titles.map(title =>
          props.isLinked ? (
            <h2 key={title}>
              <Link className="subMenu__title" to={title}>
                {title}
              </Link>
            </h2>
          ) : (
            <h2 className="subMenu__title" key={title}>
              {title}
            </h2>
          )
        )}
      </div>
      {props.children}
    </div>
  );
};

export default SubMenu;
