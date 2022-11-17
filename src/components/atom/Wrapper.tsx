import { ReactNode } from 'react';

interface WrapperProps {
  className: string;
  children: ReactNode;
}

const Wrapper = (props: WrapperProps) => {
  return <div className={`wrapper ${props.className}`}>{props.children}</div>;
};

export default Wrapper;
