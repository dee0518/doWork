interface selectProps {
  id: string;
  optionList: string[];
  [key: string]: any;
}

interface SelectBoxProps {
  select: selectProps;
}

function SelectBox({ select }: SelectBoxProps) {
  const { optionList, ...selectProps } = select;

  return (
    <select className="select__box" {...selectProps}>
      {optionList.map((item, i) => (
        <option key={select.id + i} value={item.toLowerCase()}>
          {item}
        </option>
      ))}
    </select>
  );
}

export default SelectBox;
