import "./Input.css";

const Input = (props) => {
  return (
    <div className="Input">
      <label htmlFor={props.name}>{props.label}</label>
      <input
        type={props.type}
        id={props.name}
        placeholder={props.placeholder}
        minLength={props.minLength}
        maxLength={props.maxLength}
        required={props.required}
        name={props.name}
        value={props.value}
        onChange={props.handleInputChange}
        autoComplete={props.autoComplete}
        readOnly={props.readOnly}
      />
    </div>
  );
};

{
  /* <div className="Input">
<label htmlFor={props.name}>{props.label}</label>
<input
  type="text"
  id={props.name}
  placeholder={props.placeholder}
  minLength="5"
  maxLength="30"
  required
  name={props.name}
  value={props.value}
  onChange={handleInputChange}
  autoComplete="off"
/>
</div> */
}

export default Input;
