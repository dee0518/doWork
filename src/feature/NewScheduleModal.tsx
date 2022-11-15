import Modal from '../components/moleclues/Modal';
import InputForm from '../components/moleclues/InputForm';
import Datepicker from './Datepicker';
import SelectBox from '../components/moleclues/SelectBox';
import StatusCheckboxList from '../components/moleclues/StatusCheckboxList';

const NewScheduleModal = () => {
  return (
    <Modal title={'New Schedule'} className="new__schedule">
      <form>
        <div className="new__schedule__form">
          <StatusCheckboxList statusList={['to do', 'private', 'important', 'meeting']} />
        </div>
        <div className="new__schedule__form">
          <InputForm
            input={{ id: 'title', type: 'text', placeholder: '새로운 일정을 알려주세요.' }}
            label={{ htmlFor: 'title', className: 'blind', children: '제목' }}
          />
        </div>
        <div className="new__schedule__form">
          <span>시간</span>
          <div className="from">
            <Datepicker />
            <SelectBox select={{ id: 'fromTime', optionList: ['1', '2'] }} />
          </div>
          <div className="to">
            <Datepicker />
            <SelectBox select={{ id: 'toTime', optionList: ['1', '2'] }} />
          </div>
        </div>
        <div className="new__schedule__form">
          <span>참석자</span>
          <InputForm
            input={{ id: 'collaborator', type: 'text', placeholder: 'abc@email.com' }}
            label={{ htmlFor: 'collaborator', className: 'blind', children: '이메일 검색' }}
          />
        </div>
        <div className="new__schedule__form">
          <span>내용</span>
          <textarea placeholder="내용을 입력해주세요" />
        </div>
        <button type="submit" className="new__schedule__submit">
          저장
        </button>
      </form>
    </Modal>
  );
};

export default NewScheduleModal;
