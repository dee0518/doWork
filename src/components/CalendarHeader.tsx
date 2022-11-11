interface HeaderProps {
  type: string;
  date: Date;
  dateType: string[];
  week: number[];
}

const CalendarHeader = ({ type, date, dateType, week }: HeaderProps) => {
  return (
    <div className={`calendar__header ${type}`}>
      <button className="calendar__header__prev-btn" aria-label="month prev"></button>
      <span className="calendar__header__date">
        {date.toLocaleString('en-US', { month: 'long' })}
        {dateType.includes('date') && ` ${date.getDate()}`}
        {dateType.includes('year') && `, ${date.getFullYear()}`}
        {dateType.includes('week') && ` ${week[0]} - ${week[6]}`}
      </span>
      <button className="calendar__header__next-btn" aria-label="month next"></button>
    </div>
  );
};

export default CalendarHeader;
