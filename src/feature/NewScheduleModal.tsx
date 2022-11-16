import Modal from '../components/moleclues/Modal';
import InputForm from '../components/moleclues/InputForm';
import Datepicker from './Datepicker';
import SelectBox from '../components/moleclues/SelectBox';
import { ChangeEvent, MouseEvent, FormEvent, useState } from 'react';

interface NewScheduleModalProps {
  onClose: () => void;
}

interface DatepickerState {
  isOpen: boolean;
  selectedAt: Date;
  date: Date;
  time: string;
}

const setTimeUnit = (time: number): string => (time < 10 ? `0${time}:00` : `${time}:00`);
const datepickerState: DatepickerState = {
  isOpen: false,
  selectedAt: new Date(),
  date: new Date(),
  time: setTimeUnit(new Date().getHours()),
};

const timeList: string[] = new Array(24).fill(1).map((_, i) => setTimeUnit(i));

const NewScheduleModal = ({ onClose }: NewScheduleModalProps) => {
  const statusList = ['to do', 'private', 'important', 'meeting'];
  const [curStatus, setCurStatus] = useState<string>('newtodo');
  const [fromDate, setFromDate] = useState<DatepickerState>(datepickerState);
  const [toDate, setToDate] = useState<DatepickerState>(datepickerState);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => setCurStatus(e.target.id);
  const onOpenDatepicker = (type, _) => {
    if (type === 'from') {
      setFromDate(prev => ({ ...prev, isOpen: true }));
      setToDate(prev => ({ ...prev, isOpen: false }));
    } else {
      setFromDate(prev => ({ ...prev, isOpen: false }));
      setToDate(prev => ({ ...prev, isOpen: true }));
    }
  };

  const onCloseDatepicker = (e: MouseEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).closest('.calendar')) return;
    if (fromDate.isOpen) setFromDate(prev => ({ ...prev, isOpen: false, date: prev.selectedAt }));
    if (toDate.isOpen) setToDate(prev => ({ ...prev, isOpen: false, date: prev.selectedAt }));
  };

  const onClickDate = (type, selectedAt) => {
    type === 'from'
      ? setFromDate(prev => ({ ...prev, isOpen: false, selectedAt, date: selectedAt }))
      : setToDate(prev => ({ ...prev, isOpen: false, selectedAt, date: selectedAt }));
  };

  const onClickHeaderBtn = (type, date) => {
    type === 'from' ? setFromDate(prev => ({ ...prev, date })) : setToDate(prev => ({ ...prev, date }));
  };

  return (
    <Modal title={'New Schedule'} className="new__schedule" onClose={onClose} onClick={onCloseDatepicker}>
      <form onSubmit={onSubmit}>
        <div className="new__schedule__form">
          {statusList.map(status => {
            const name = 'new' + status.replace(/\s/g, '');
            const className = name === curStatus ? `on ${name}` : name;

            return (
              <InputForm
                key={`new${status}`}
                input={{ id: name, type: 'radio', name: 'status', onChange: onChange }}
                label={{ htmlFor: name, className: className, children: status }}
              />
            );
          })}
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
            <Datepicker
              isShowCalendar={fromDate.isOpen}
              selectedAt={fromDate.selectedAt}
              date={fromDate.date}
              onOpenDatePicker={onOpenDatepicker.bind(null, 'from')}
              onClickDate={onClickDate.bind(null, 'from')}
              onClickHeaderBtn={onClickHeaderBtn.bind(null, 'from')}
            />
            <SelectBox select={{ id: 'fromTime', defaultValue: fromDate.time, optionList: timeList }} />
          </div>
          <div className="to">
            <Datepicker
              isShowCalendar={toDate.isOpen}
              selectedAt={toDate.selectedAt}
              date={toDate.date}
              onOpenDatePicker={onOpenDatepicker.bind(null, 'to')}
              onClickDate={onClickDate.bind(null, 'to')}
              onClickHeaderBtn={onClickHeaderBtn.bind(null, 'to')}
            />
            <SelectBox select={{ id: 'toTime', defaultValue: toDate.time, optionList: timeList }} />
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
