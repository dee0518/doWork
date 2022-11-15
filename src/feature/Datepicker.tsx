import Calendar from './Calendar';

const Datepicker = () => {
  return (
    <div className="datepicker">
      <button className="datepicker__btn">YYYY.MM.DD</button>
      <Calendar type="small" lang={'en'} strLeng={3} dateType={['year']} />
    </div>
  );
};

export default Datepicker;
