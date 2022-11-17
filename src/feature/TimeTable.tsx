interface TimeTableList {
  type: string;
  title: string;
  start: number;
  end: number;
}

const TimeTable = ({ date, dates, scheduleList }) => {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDateMonth = dates[0] > 20 ? month - 1 : month;
  const lastDateMonth = dates[dates.length - 1] < 7 ? month + 1 : month;
  const firstDate = new Date(year, firstDateMonth, dates[0]);
  const lastDate = new Date(year, lastDateMonth, dates[dates.length - 1]);
  const timeTable = Array.from(new Array(dates.length / 7), () => []);

  const filterScheduleList = scheduleList.filter(({ from_at, to_at }) => {
    const fromDate = new Date(from_at);
    const toDate = new Date(to_at);

    if (fromDate <= firstDate && firstDate <= toDate) return true;
    else if (firstDate <= fromDate && toDate <= lastDate) return true;
    else if (fromDate <= lastDate && lastDate <= toDate) return true;
    else return false;
  });

  const clacGapDay = (time: number): number => time / (1000 * 60 * 60 * 24);

  filterScheduleList.forEach(({ status, from_at, to_at, title }) => {
    const from = new Date(from_at) < firstDate ? firstDate : new Date(from_at);
    const to = new Date(to_at) > lastDate ? lastDate : new Date(to_at);

    const fromDate = new Date(from.getFullYear(), from.getMonth(), from.getDate());
    const toDate = new Date(to.getFullYear(), to.getMonth(), to.getDate());

    const gapTime = toDate.getTime() - fromDate.getTime();
    let gapDay = clacGapDay(gapTime);

    const fromM = from.getMonth();
    const fromD = from.getDate();
    const fromDay = from.getDay();

    let startArrIdx =
      fromM === month
        ? Math.floor(dates.findIndex((val, i) => (fromD < 10 ? val === fromD : i > 5 && val === fromD)) / 7)
        : fromM === month - 1
        ? 0
        : timeTable.length - 1;

    let isStarted = true;

    while (gapDay > 0 && startArrIdx < timeTable.length) {
      const start = isStarted ? fromDay : 0;
      const end = isStarted ? (fromDay + gapDay > 6 ? 6 : fromDay + gapDay) : gapDay < 7 ? gapDay : 6;

      timeTable[startArrIdx] = [...timeTable[startArrIdx], { type: status, start, end, title }];
      gapDay -= isStarted ? 7 - fromDay : 7;
      startArrIdx += 1;
      if (isStarted) isStarted = false;
    }
  });

  console.log(timeTable);
  return (
    <div className="time__table">
      {timeTable.length > 0 &&
        timeTable.map((times, i) => (
          <div key={'t' + i} className="time__table__row">
            {times.map(({ type, start, end, title }: TimeTableList, i) => (
              <div
                key={'s' + i}
                className={`time__table__schedule  ${type}`}
                style={{
                  left: `${(100 / 7) * start}%`,
                  top: `${i * 25 + 36}px`,
                  width: `${((end - start + 1) * 100) / 7}%`,
                }}>
                {title}
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default TimeTable;