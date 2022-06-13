import React from "react";

const ErrorMessageCustom = ({ message }) => {
  return (
    <>
      <div
        style={{
          backgroundColor: "red",
          opacity: "0.4",
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
          {message}
        </p>
      </div>
    </>
  );
};

export default ErrorMessageCustom;
