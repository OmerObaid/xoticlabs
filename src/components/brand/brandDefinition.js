import React, { useEffect, useState } from "react";
import { FormDataHelper } from "../../jwt/_helpers/FormDataHelper";
import { GeneralServices } from "../../jwt/_services/General.services";
import BrandCheckBoxes from "./brandCheckBoxes";

const BrandDefinition = ({
  checkboxName,
  titleString,
  URL,
  checkBoxLabelClass,
  checkBoxClass = "check-boxes",
  children,
}) => {
  const [allCheckBoxes, setAllCheckBoxes] = useState([]);
  const getAllCheckBoxes = () => {
    var helper = FormDataHelper();
    GeneralServices.postRequest(helper, URL).then(
      (successResponse) => {
        if (successResponse.data.length > 0)
          setAllCheckBoxes(successResponse.data);
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    );
  };
  useEffect(() => {
    getAllCheckBoxes();
  }, []);

  return (
    <>
      <span className="inputLabel required">{titleString}</span>
      <div className="check-boxes-container">
        {allCheckBoxes.map((data) => {
          return (
            <BrandCheckBoxes
              labelTitle={data.title}
              checkboxName={checkboxName}
              checkBoxLabelClass={checkBoxLabelClass}
              checkBoxClass={checkBoxClass}
              id={data.id}
              key={data.id}
            />
          );
        })}
      </div>
      {children}
    </>
  );
};

export default BrandDefinition;
