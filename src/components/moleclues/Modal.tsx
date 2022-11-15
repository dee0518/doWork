import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  title: string;
  children: ReactNode;
  [key: string]: string | ReactNode;
}

const ModalWrapper = (props: ModalProps) => {
  return (
    <div className="dimmend__layer">
      <div className={`modal ${props.className ? props.className : ''}`}>
        <div className="modal__header">
          <h3>{props.title}</h3>
          <button aria-label="close"></button>
        </div>
        <div className="modal__body">{props.children}</div>
      </div>
    </div>
  );
};

const Modal = ({ children, title, ...rest }: ModalProps) => {
  return (
    <>
      {ReactDOM.createPortal(
        <ModalWrapper title={title} {...rest}>
          {children}
        </ModalWrapper>,
        document.querySelector('#modal__root') as HTMLElement
      )}
    </>
  );
};

export default Modal;
