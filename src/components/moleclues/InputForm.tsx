type EventHandler = (any) => void;

interface LabelProps {
  htmlFor: string;
  [key: string]: string;
}

interface InputProps {
  id: string;
  type: string;
  [key: string]: string | EventHandler;
}

interface InputFormProps {
  label: LabelProps;
  input: InputProps;
}

const InputForm = ({ label, input }: InputFormProps) => {
  const { htmlFor, ...labelRest } = label;
  return (
    <div className="input__form">
      <label htmlFor={htmlFor} {...labelRest} />
      <input {...input} />
    </div>
  );
};

export default InputForm;
