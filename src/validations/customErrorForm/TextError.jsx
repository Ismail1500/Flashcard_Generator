// this components is displaing the input text error in the createflasccard
// page this will access the input namevalue and coording to the name value this will show  YUP validation errors 


import React from "react";

const TextError = (props) => {
  return <div className="text-sm text-red-500">{props.children}</div>;
};

export default TextError;
