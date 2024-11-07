// import "./input.css"

const InputField = ({ type = "text",inputRef,thisId, value, onChange, placeholder, name, required = false, disabled = false, props, className,accept,style, step, onMouseEnter,readOnly }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      ref={inputRef}
      id={thisId}
      name={name}
      required={required}
      disabled={disabled}
      accept={accept}
      step={step}
      onMouseEnter={onMouseEnter}
      readOnly={readOnly}
      style={{
        ...style
      }}
      className={`${className}`}
      {...props}
    />
  );
};

export default InputField;
