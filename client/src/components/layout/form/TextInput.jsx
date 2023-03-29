import React from "react";

const TextInput = ({name, label, onChange, value}) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input type="text" name={name} onChange={onChange} defaultValue={value} />
    </>
  );
};

export default TextInput;
