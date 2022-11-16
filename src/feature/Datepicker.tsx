import Calendar from './Calendar';

interface DatepickerProps {
  isShowCalendar: boolean;
  date: Date;
  selectedAt: Date;
  onOpenDatePicker: () => any;
  onClickDate: (date: Date) => void;
  onClickHeaderBtn: (date: Date) => void;
}

const Datepicker = ({
  isShowCalendar,
  date,
  selectedAt,
  onOpenDatePicker,
  onClickDate,
  onClickHeaderBtn,
}: DatepickerProps) => {
  const changeDate = date =>
    `${date.getFullYear()}.${date.getMonth() + 1 < 10 ? '0' : ''}${date.getMonth() + 1}.${
      date.getDate() < 10 ? '0' : ''
    }${date.getDate()}`;

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className="datepicker">
      <button className="datepicker__btn" onClick={onOpenDatePicker}>
        {changeDate(selectedAt)}
      </button>
      {isShowCalendar && (
        <Calendar
          date={date}
          type="small"
          lang={'en'}
          strLeng={3}
          dateType={['year']}
          onClickDate={onClickDate}
          onClickHeaderBtn={onClickHeaderBtn}
        />
      )}
    </div>
  );
};

export default Datepicker;
