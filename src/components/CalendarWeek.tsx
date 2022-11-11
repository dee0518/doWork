const WEEK_KO = ['일', '월', '화', '수', '목', '금', '토'];
const WEEK_EN = ['sunday', 'monday', 'Tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

interface WeekProps {
  type: string;
  lang: string;
  strLeng: number;
}

const CalendarWeek = ({ type, lang, strLeng }: WeekProps) => {
  let week: string[] = lang === 'ko' ? WEEK_KO : WEEK_EN;

  if (lang === 'en') {
    week = week.map(day => (strLeng ? day.slice(0, strLeng + 1) : day));
  }

  return (
    <ul className={`calendar__week ${type}`}>
      {week.map(day => (
        <li key={day}>{day}</li>
      ))}
    </ul>
  );
};

export default CalendarWeek;
