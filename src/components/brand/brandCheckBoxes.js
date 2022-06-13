import React from "react";
import { Field } from "formik";

const BrandCheckBoxes = ({
  labelTitle,
  checkboxName,
  checkBoxLabelClass,
  checkBoxClass,
  id,
}) => {
  return (
    <>
      <div className={checkBoxClass}>
        <label
          htmlFor={`${checkboxName}_${id}`}
          className={checkBoxLabelClass ? checkBoxLabelClass : ""}
        >
          <Field
            type="checkbox"
            name={checkboxName}
            id={`${checkboxName}_${id}`}
            value={id}
          />
          {labelTitle}
        </label>
      </div>
    </>
  );
};

export default BrandCheckBoxes;
