import Modal from '../components/moleclues/Modal';
import InputForm from '../components/moleclues/InputForm';
import Datepicker from './Datepicker';
import SelectBox from '../components/moleclues/SelectBox';
import { ChangeEvent, MouseEvent, FormEvent, useState } from 'react';
import { postSchedule } from '../api/schedule';
import { useSelector } from 'react-redux';
import { ReducerType } from '../store/rootReducer';
import { debounce, isEmpty } from 'lodash';
import { getUserEmail } from '../api/user';
import { UserInfo } from '../types/auth';

interface NewScheduleModalProps {
  onClose: () => void;
}

interface DatepickerState {
  isOpen: boolean;
  selectedAt: Date;
  date: Date;
  time: string;
}

type CollaboratorsState = string[];
type userSearchState = {
  email: string;
  name: string;
};

const setTimeUnit = (time: number): string => (time < 10 ? `0${time}:00` : `${time}:00`);
const datepickerState: DatepickerState = {
  isOpen: false,
  selectedAt: new Date(),
  date: new Date(),
  time: setTimeUnit(new Date().getHours()),
};

const timeList: string[] = new Array(24).fill(1).map((_, i) => setTimeUnit(i));
const statusList = ['to do', 'private', 'important', 'meeting'];

const NewScheduleModal = ({ onClose }: NewScheduleModalProps) => {
  const { user } = useSelector((state: ReducerType) => state.auth);
  const [title, setTitle] = useState<string>('');
  const [collaborators, setCollaborators] = useState<CollaboratorsState>([]);
  const [userSearch, setUserSearch] = useState<userSearchState | null>(null);
  const [searchUserKeyword, setSearchUserKeyword] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [status, setStatus] = useState<string>('new_todo');
  const [fromDate, setFromDate] = useState<DatepickerState>(datepickerState);
  const [toDate, setToDate] = useState<DatepickerState>(datepickerState);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (title.trim() === '') return;

    const [, newStatus] = status.split('_');

    const schedule = {
      user: user.email,
      title,
      status: newStatus,
      from_at: fromDate.selectedAt,
      from_time: fromDate.time,
      to_at: toDate.selectedAt,
      to_time: toDate.time,
      collaborators,
      content,
    };

    const response = await postSchedule(schedule);

    if (response.result) {
      onClose();
    } else {
      alert('잠시 후에 다시 시도해주세요.');
    }
  };
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;

    if (name === 'status') setStatus(e.target.id);
    else if (name === 'title') setTitle(e.target.value);
    else if (name === 'collaborators') {
      setSearchUserKeyword(e.target.value);
      searchUser(e);
    } else if (name === 'content') setContent(e.target.value);
    else if (name === 'from') setFromDate(prev => ({ ...prev, time: e.target.value }));
    else if (name === 'to') setToDate(prev => ({ ...prev, time: e.target.value }));
  };

  const searchUser = e => {
    const { value } = e.target as HTMLInputElement;

    debounce(async () => {
      const response = await getUserEmail(value);
      if (response && !isEmpty(response.data)) {
        const [[, value]]: [string, UserInfo][] = Object.entries(response.data);

        if (collaborators.includes(value.email)) return;
        setUserSearch({ email: value.email, name: value.displayName });
      }
    }, 500)();
  };

  const onAddCollaborator = (email, _) => {
    if (collaborators.length >= 5) {
      alert('5명까지만 추가 가능합니다.');
      return;
    }

    setCollaborators(prev => [...prev, email]);
    console.log('sdf');
    setUserSearch(null);
    console.log('error');
    setSearchUserKeyword('');
  };

  const onOpenDatepicker = (type, _) => {
    if (type === 'from') {
      setFromDate(prev => ({ ...prev, isOpen: true }));
    } else {
      setToDate(prev => ({ ...prev, isOpen: true }));
    }
  };

  const onCloseDatepicker = (e: MouseEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).closest('.calendar')) return;
    if (fromDate.isOpen) setFromDate(prev => ({ ...prev, isOpen: false, date: prev.selectedAt }));
    if (toDate.isOpen) setToDate(prev => ({ ...prev, isOpen: false, date: prev.selectedAt }));
  };

  const onClickDate = (type, selectedAt) => {
    if (type === 'from') {
      setFromDate(prev => ({ ...prev, isOpen: false, selectedAt, date: selectedAt }));

      if (selectedAt > toDate.selectedAt) {
        setToDate(prev => ({ ...prev, selectedAt, date: selectedAt }));
      }
    } else {
      setToDate(prev => ({ ...prev, isOpen: false, selectedAt, date: selectedAt }));
      if (selectedAt < fromDate.selectedAt) {
        setFromDate(prev => ({ ...prev, selectedAt, date: selectedAt }));
      }
    }
  };

  const onClickHeaderBtn = (type, date) => {
    type === 'from' ? setFromDate(prev => ({ ...prev, date })) : setToDate(prev => ({ ...prev, date }));
  };

  return (
    <Modal title={'New Schedule'} className="new__schedule" onClose={onClose} onClick={onCloseDatepicker}>
      <form onSubmit={onSubmit}>
        <div className="new__schedule__form">
          {statusList.map(st => {
            const name = 'new_' + st.replace(/\s/g, '');
            const className = name === status ? `on ${name}` : name;

            return (
              <InputForm
                key={`new${st}`}
                input={{ id: name, type: 'radio', name: 'status', onChange: onChange }}
                label={{ htmlFor: name, className: className, children: st }}
              />
            );
          })}
        </div>
        <div className="new__schedule__form">
          <InputForm
            input={{
              id: 'title',
              type: 'text',
              name: 'title',
              value: title,
              placeholder: '새로운 일정을 알려주세요.',
              onChange: onChange,
            }}
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
            <SelectBox
              select={{
                id: 'fromTime',
                name: 'from',
                optionList: timeList,
                onChange: onChange,
                value: fromDate.time,
              }}
            />
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
            <SelectBox
              select={{
                id: 'toTime',
                name: 'to',
                optionList: timeList,
                onChange: onChange,
                value: toDate.time,
              }}
            />
          </div>
        </div>
        <div className="new__schedule__form">
          <span>참석자</span>
          <InputForm
            input={{
              id: 'collaborator',
              type: 'text',
              value: searchUserKeyword,
              name: 'collaborators',
              placeholder: 'abc@email.com',
              onChange: onChange,
            }}
            label={{ htmlFor: 'collaborator', className: 'blind', children: '이메일 검색' }}
          />
          {userSearch !== null && (
            <button className="add__collaborator" onClick={onAddCollaborator.bind(null, userSearch.email)}>
              <span>{userSearch.name}</span>
              <span>{userSearch.email}</span>
            </button>
          )}
          {collaborators.length > 0 && (
            <ul className="new__schedule__form__list">
              {collaborators.map((user, i) => (
                <li key={i}>
                  <span>{user}</span>
                  <button type="button" aria-label="delete collaborator"></button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="new__schedule__form">
          <span>내용</span>
          <textarea placeholder="내용을 입력해주세요" name="content" value={content} onChange={onChange} />
        </div>
        <button type="submit" className="new__schedule__submit">
          저장
        </button>
      </form>
    </Modal>
  );
};

export default NewScheduleModal;
