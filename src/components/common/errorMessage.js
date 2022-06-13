import React from "react";

const ErrorMessage = ({ errorMsg }) => {
  return (
    <div
      style={{
        backgroundColor: "red",
        opacity: "0.5",
        height: "30px",
        padding: "8px",
        marginBottom: "10px",
      }}
    >
      <p
        style={{
          color: "white",
          fontSize: "12px",
        }}
      >
        {errorMsg}
      </p>
    </div>
  );
};

export default ErrorMessage;
