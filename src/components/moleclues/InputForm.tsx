type EventHandler = (any) => void;

interface LabelProps {
  htmlFor: string;
  [key: string]: string;
}

interface InputProps {
  id: string;
  type: string;
  checked?: boolean;
  [key: string]: string | boolean | EventHandler;
}

interface InputFormProps {
  label: LabelProps;
  input: InputProps;
}

const InputForm = ({ label, input }: InputFormProps) => {
  const { htmlFor, ...labelProps } = label;
  return (
    <div className="input__form">
      <label htmlFor={htmlFor} {...labelProps} />
      <input {...input} />
    </div>
  );
};

export default InputForm;
