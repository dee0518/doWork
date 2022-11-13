import InputForm from './InputForm';

interface StatusCheckboxList {
  statusList: string[];
}

const StatusCheckboxList = ({ statusList }: StatusCheckboxList) => {
  return (
    <div className="status__checkbox__list">
      {statusList.map(status => {
        const classStr = status.replace(/\s/g, '');

        return (
          <InputForm
            key={classStr}
            input={{ id: classStr, type: 'checkbox' }}
            label={{ htmlFor: classStr, children: status }}
          />
        );
      })}
    </div>
  );
};

export default StatusCheckboxList;
