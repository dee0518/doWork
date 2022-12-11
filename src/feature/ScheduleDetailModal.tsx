import Modal from '../components/moleclues/Modal';

const ScheduleDetailModal = ({
  schedule: { id, title, status, content, from_at, from_time, to_at, to_time, collaborators },
  onClose,
  onClick,
}) => {
  const fromAt = new Date(from_at);
  const fromYear = fromAt.getFullYear();
  const fromMonth = fromAt.getMonth();
  const fromDate = fromAt.getDate();

  const toAt = new Date(to_at);
  const toYear = toAt.getFullYear();
  const toMonth = toAt.getMonth();
  const toDate = toAt.getDate();

  return (
    <Modal
      title={title}
      onClose={onClose}
      onClick={onClick.bind(null, id)}
      className={`schedule__detail__modal ${status}`}>
      <div className="schedule__detail__modal__contents">
        <textarea
          readOnly
          className={content === '' ? 'empty' : ''}
          value={content === '' ? '내용이 비어 있어요:)' : content}></textarea>
        <div className="schedule__detail__modal__contents__bottom">
          <span className="member">{collaborators ? collaborators.length : 0} Members</span>
          <span className="date">{`${fromYear}.${fromMonth}.${fromDate} ${from_time} - ${toYear}.${toMonth}.${toDate} ${to_time}`}</span>
        </div>
      </div>
      <div className="schedule__detail__modal__edit_group">
        <button className="edit__schedule" aria-label="편집하기"></button>
        <button className="delete__schedule" aria-label="삭제하기"></button>
      </div>
    </Modal>
  );
};

export default ScheduleDetailModal;
