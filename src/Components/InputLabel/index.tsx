import React from "react";

type InputLabelPropTypes = {
  label: string;
  optional?: boolean;
};

const InputLabel: React.FC<InputLabelPropTypes> = ({ label, optional }) => {
  return (
    <div className="margin--xsmall-b font-bodoni-moda font-15">
      <span className="font-bold">{label}</span>{" "}
      <span>{optional ? "(Optional)" : ""}</span>
    </div>
  );
};

export default InputLabel;
