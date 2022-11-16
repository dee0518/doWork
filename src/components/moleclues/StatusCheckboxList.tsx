import InputForm from './InputForm';
import { Status, scheduleActions } from '../../store/schedule';
import { useDispatch } from 'react-redux';
import { ChangeEvent } from 'react';

interface StatusCheckboxList {
  statusList: Status[];
}

const StatusCheckboxList = ({ statusList }: StatusCheckboxList) => {
  const dispatch = useDispatch();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(scheduleActions.setFilter(e.target.id));
  };

  return (
    <div className="status__checkbox__list">
      {statusList.map(({ id, name, checked }) => {
        const c = name.replace(/\s/g, '');
        const className = checked ? `on ${c}` : c;
        return (
          <InputForm
            key={id}
            input={{ id, type: 'checkbox', checked: checked, onChange: onChange }}
            label={{ htmlFor: id, children: name, className: className }}
          />
        );
      })}
    </div>
  );
};

export default StatusCheckboxList;
