// import { useSelector } from 'react-redux';
// import { ReducerType } from 'store/rootReducer';
// import { scheduleActions } from 'store/schedule';
import CalendarHeader from './CalendarHeader';
import CalendarWeek from './CalendarWeek';
// import CalendarDates from './CalendarDates';

interface CalendarProps {
  type: string;
  lang: string;
  date: Date;
  dateType: string[];
  strLeng: number;
  onClickDate: (date: Date) => void;
  onClickHeaderBtn: (date: Date) => void;
}

const Calendar = ({ date, type, lang, dateType, strLeng, onClickDate, onClickHeaderBtn }: CalendarProps) => {
  const today = new Date();

  const year: number = today.getFullYear();
  const month: number = today.getMonth();

  const lastDateOnPrevMonth: number = new Date(year, month, 0).getDate();
  const lastDateOnCurMonth: number = new Date(year, month + 1, 0).getDate();

  const theDayOfTheWeekOn1st: number = new Date(`${year}-${month}-1`).getDay();
  const theDayOfTheWeekOnLast: number = new Date(`${year}-${month}-${lastDateOnCurMonth}`).getDay();

  const theRestOfDatesOnPrevMonth: number[] = new Array(6 - theDayOfTheWeekOn1st)
    .fill(1)
    .map((_, i) => lastDateOnPrevMonth - theDayOfTheWeekOn1st + i);
  const theDatesOnCurMonth: number[] = new Array(lastDateOnCurMonth).fill(1).map((_, i) => i + 1);
  const theRestOfDatesOnNextMonth: number[] = new Array(5 - theDayOfTheWeekOnLast).fill(1).map((_, i) => i + 1);
  const dates: number[] = [...theRestOfDatesOnPrevMonth, ...theDatesOnCurMonth, ...theRestOfDatesOnNextMonth];

  return (
    <div className={`calendar ${type}`}>
      <CalendarHeader date={date} type={type} dateType={dateType} week={[]} onClickHeaderBtn={onClickHeaderBtn} />
      <div className="calendar__week__dates__wrapper">
        <CalendarWeek type={type} lang={lang} strLeng={strLeng} />
        <ul className="calendar__dates">
          {dates.map((curDate, i) => {
            const month = date.getMonth() + (i < 7 && curDate > 20 ? -1 : i > 24 && curDate < 7 ? 1 : 0);
            const newDate = new Date(date.getFullYear(), month, curDate);
            return (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex
              <li key={i} tabIndex={0} onClick={onClickDate.bind(null, newDate)}>
                {curDate}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Calendar;
