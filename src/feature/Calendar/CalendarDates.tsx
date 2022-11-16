import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { scheduleActions } from '../../store/schedule';

interface DatesProps {
  dates: number[];
  onClickDate: (e, date: number) => any;
}

const CalendarDates = ({ dates, onClickDate }: DatesProps) => {
  const dispatch = useDispatch();
  const onClick = (e, date) => {
    onClickDate(e, date);
  };

  return (
    <ul className="calendar__dates">
      {dates.map((date, i) => (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex
        <li key={i} tabIndex={0} onClick={onClick.bind(null, date)}>
          {date}
        </li>
      ))}
    </ul>
  );
};

export default CalendarDates;
