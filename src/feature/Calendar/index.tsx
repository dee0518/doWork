import CalendarHeader from './CalendarHeader';
import CalendarWeek from './CalendarWeek';
import CalendarDates from './CalendarDates';

interface CalendarProps {
  type: string;
  lang: string;
  dateType: string[];
  strLeng: number;
}

const Calendar = ({ type, lang, dateType, strLeng }: CalendarProps) => {
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
      <CalendarHeader type={type} date={today} dateType={dateType} week={[]} />
      <div className="calendar__week__dates__wrapper">
        <CalendarWeek type={type} lang={lang} strLeng={strLeng} />
        <CalendarDates dates={dates} />
      </div>
    </div>
  );
};

export default Calendar;
