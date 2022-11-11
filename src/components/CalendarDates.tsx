interface DatesProps {
  dates: number[];
}

const CalendarDates = ({ dates }: DatesProps) => {
  return (
    <ul>
      {dates.map(date => (
        <li key={date}>{date}</li>
      ))}
    </ul>
  );
};

export default CalendarDates;
