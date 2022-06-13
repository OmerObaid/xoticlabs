import React from "react";
import styled, { keyframes } from "styled-components";

const Inner = styled.div`
  padding: 8px 16px;

  textarea {
    border: 0;
    font-size: 14px;
    margin: 6px 0;
    min-height: 60px;
    outline: 0;
  }
`;

const Button = styled.div`
  background: #212529;
  border: 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  margin: 0;
  outline: 0;
  padding: 8px 16px;
  text-align: center;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
  width: 100%;

  transition: background 0.21s ease-in-out;

  &:focus,
  &:hover {
    background: #212529;
  }
`;

function TextEditor(props) {
  return (
    <React.Fragment>
      {/* <Inner> */}
      {/* <textarea
          placeholder="Write description"
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          onChange={props.onChange}
          value={props.value}
        ></textarea> */}
      <input
        placeholder="Write description"
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        onChange={props.onChange}
        value={props.value}
        type="text"
        className="form-control"
        style={{
          backgroundColor: "#212529",
          outline: "none",
          border: "0px",
          borderRadius: "0",
          width: "270px",
          paddingRight: "0px",
          color: "#fff",
          height: "30px",
          paddingLeft: "15px",
          zIndex: "40000",
        }}
      />
      {/* </Inner> */}
      {props.value && <Button onClick={props.onSubmit}>Submit</Button>}
    </React.Fragment>
  );
}

export default TextEditor;
