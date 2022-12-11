import { useDispatch, useSelector } from 'react-redux';
import { scheduleActions } from '../store/schedule';
import { ReducerType } from '../store/rootReducer';
import { iScheduleList } from '../types/schedule';

const TimeTable = ({ date, dates, scheduleList }) => {
  const dispatch = useDispatch();
  const year = date.getFullYear();
  const month = date.getMonth();
  const { statusFilter, searchKeyword } = useSelector((state: ReducerType) => state.schedule);

  const firstDateMonth = dates[0] > 20 ? month - 1 : month;
  const lastDateMonth = dates[dates.length - 1] < 7 ? month + 1 : month;
  const firstDate = new Date(year, firstDateMonth, dates[0]);
  const lastDate = new Date(year, lastDateMonth, dates[dates.length - 1]);
  const timeTable: iScheduleList[][] = Array.from(new Array(dates.length / 7), () => []);

  let filterScheduleList = scheduleList.filter(({ from_at, to_at }) => {
    const fromDate = new Date(from_at);
    const toDate = new Date(to_at);

    if (fromDate <= firstDate && firstDate <= toDate) return true;
    else if (firstDate <= fromDate && toDate <= lastDate) return true;
    else if (fromDate <= lastDate && lastDate <= toDate) return true;
    else return false;
  });

  const statusList = statusFilter.filter(({ checked }) => checked).map(({ name }) => name.replace(/\s/g, ''));
  filterScheduleList = filterScheduleList.filter(
    ({ status, title }) => statusList.includes(status) && title.match(new RegExp(searchKeyword, 'gi'))
  );

  const clacGapDay = (time: number): number => time / (1000 * 60 * 60 * 24);

  filterScheduleList.forEach(({ id, status, from_at, to_at, title }) => {
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
    while (gapDay >= 0 && startArrIdx < timeTable.length) {
      const start = isStarted ? fromDay : 0;
      const end = isStarted ? (fromDay + gapDay > 6 ? 6 : fromDay + gapDay) : gapDay < 7 ? gapDay : 6;
      const standard = [0, 1, 2, 3, 4];
      timeTable
        .find((_, i) => i === startArrIdx)
        .forEach(t => {
          if ((t.start <= start && start <= t.end) || (t.start <= end && end <= t.end))
            standard.splice(standard.indexOf(t.top), 1);
        });
      const top = standard.shift();

      timeTable[startArrIdx] = [...timeTable[startArrIdx], { id, type: status, top, start, end, title }];
      gapDay -= isStarted ? 7 - fromDay : 7;
      startArrIdx += 1;
      if (isStarted) isStarted = false;
    }
  });

  const onClick = (id, _) => {
    dispatch(scheduleActions.setEditedScheduleId(id));
  };

  console.log(timeTable);
  return (
    <div className="time__table">
      {timeTable.length > 0 &&
        timeTable.map((times, i) => (
          <div key={'t' + i} className="time__table__row">
            {times.map(({ id, type, top, start, end, title }: iScheduleList, i) => (
              <button
                key={'s' + i}
                className={`time__table__schedule  ${type}`}
                onClick={onClick.bind(null, id)}
                style={{
                  left: `${(100 / 7) * start}%`,
                  top: `${top * 29 + 36}px`,
                  width: `${((end - start + 1) * 100) / 7}%`,
                }}>
                {title}
              </button>
            ))}
          </div>
        ))}
    </div>
  );
};

export default TimeTable;
