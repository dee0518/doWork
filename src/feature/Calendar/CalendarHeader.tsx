import { MouseEvent } from 'react';

interface HeaderProps {
  date: Date;
  type: string;
  dateType: string[];
  week: number[];
  onClickHeaderBtn: (date: Date) => void;
}

const CalendarHeader = ({ date, type, dateType, week, onClickHeaderBtn }: HeaderProps) => {
  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    const isPrevBtn = (e.target as HTMLButtonElement).classList.contains('calendar__header__prev-btn');
    const year = date.getFullYear();
    const month = date.getMonth() + (isPrevBtn ? -1 : 1);
    const curDate = date.getDate();

    onClickHeaderBtn(new Date(year, month, curDate));
  };

  return (
    <div className={`calendar__header ${type}`}>
      <button className="calendar__header__prev-btn" aria-label="month prev" onClick={onClick}></button>
      <span className="calendar__header__date">
        {date.toLocaleString('en-US', { month: 'long' })}
        {dateType.includes('date') && ` ${date.getDate()}`}
        {dateType.includes('year') && `, ${date.getFullYear()}`}
        {dateType.includes('week') && ` ${week[0]} - ${week[6]}`}
      </span>
      <button className="calendar__header__next-btn" aria-label="month next" onClick={onClick}></button>
    </div>
  );
};

export default CalendarHeader;
