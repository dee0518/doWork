import { ReactNode, MouseEvent } from 'react';
import ReactDOM from 'react-dom';

type ModalFunction = (e?: any) => any | void;

interface ModalProps {
  title: string;
  children: ReactNode;
  onClose: ModalFunction;
  onClick: ModalFunction;
  [key: string]: ReactNode | ModalFunction;
}

const ModalWrapper = (props: ModalProps) => {
  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    onClose(e);
    if (props.onClick) props.onClick(e);
  };
  const onClose = (e: MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
    if (
      !(e.target as HTMLDivElement).classList.contains('dimmend__layer') &&
      !(e.target as HTMLButtonElement).classList.contains('modal__close')
    )
      return;
    props.onClose();
  };
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className="dimmend__layer" onClick={onClick}>
      <div className={`modal ${props.className ? props.className : ''}`}>
        <div className="modal__header">
          <h3>{props.title}</h3>
          <button className="modal__close" aria-label="close" onClick={onClose}></button>
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
