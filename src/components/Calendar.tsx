import CalendarHeader from './CalendarHeader';
import CalendarWeek from './CalendarWeek';
import CalendarDates from './CalendarDates';

const Calendar = () => {
  return (
    <div className="Wrapper">
      <CalendarHeader type={''} date={new Date()} dateType={['year']} week={[]} />
      <CalendarWeek type={'small'} lang={'en'} strLeng={0} />
      <CalendarDates dates={[1, 2, 3]} />
    </div>
  );
};

export default Calendar;
