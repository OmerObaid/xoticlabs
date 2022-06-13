import styled, { keyframes } from "styled-components";
import TextEditor from "./TextEditor";
import React, { Component } from "react";

const fadeInScale = keyframes`
  from {
    opacity: 0;
    transform: scale(0);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const EditorContainer = styled.div`
  background: white;
  border-radius: 2px;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
  margin-top: 16px;
  transform-origin: top left;

  animation: ${fadeInScale} 0.31s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;
`;

class ThreadedEditor extends Component {
  state = { text: "" };

  onUpdateText = (e) => {
    const { props } = this;

    // This is the purest (native es6) way to do this
    // You can use a library such as redux and/or
    // lodash/ramda to make this cleaner
    props.onChange({
      ...props.annotation,
      data: {
        ...props.annotation.data,
        comments: [
          this.props.annotation.data
            ? {
                ...this.props.annotation.data.comments[0],
                text: e.target.value,
              }
            : {
                id: Math.random(),
                text: e.target.value,
              },
        ],
      },
    });
  };

  render() {
    const { props } = this;
    const { geometry } = props.annotation;
    if (!geometry) return null;

    return (
      <EditorContainer
        className={props.className}
        style={{
          position: "absolute",
          left: `${geometry.x}%`,
          top: `${geometry.y + geometry.height}%`,
          zIndex: "40001",
          ...props.style,
        }}
      >
        <TextEditor
          onChange={this.onUpdateText}
          onSubmit={props.onSubmit}
          value={
            props.annotation.data ? props.annotation.data.comments[0].text : ""
          }
        />
      </EditorContainer>
    );
  }
}

export default ThreadedEditor;
