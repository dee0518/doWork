import { ReactNode } from 'react';

interface SubMenuProps {
  title: string;
  children: ReactNode;
}

const SubMenu = (props: SubMenuProps) => {
  return (
    <div className="subMenu">
      <h2 className="subMenu__title">{props.title}</h2>
      {props.children}
    </div>
  );
};

export default SubMenu;
