interface DatesProps {
  dates: number[];
}

const CalendarDates = ({ dates }: DatesProps) => {
  return (
    <ul className="calendar__dates">
      {dates.map((date, i) => (
        <li key={i}>{date}</li>
      ))}
    </ul>
  );
};

export default CalendarDates;
