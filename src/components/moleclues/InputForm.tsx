interface LabelProps {
  htmlFor: string;
  [key: string]: string;
}

interface InputProps {
  id: string;
  type: string;
  [key: string]: string;
}

interface InputFormProps {
  label: LabelProps;
  input: InputProps;
}

const InputForm = (props: InputFormProps) => {
  return (
    <div className="input__form">
      <label {...props.label} />
      <input {...props.input} />
    </div>
  );
};

export default InputForm;
