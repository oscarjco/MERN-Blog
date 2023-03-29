import React from "react";

const Textarea = ({name, label, onChange, value}) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <textarea name={name} onChange={onChange} defaultValue={value} />
    </>
  );
};

export default Textarea;
