import React, { useEffect, useState } from "react";
import { getClientId } from "../../helper/siteHelper";
import { FormDataHelper } from "../../jwt/_helpers/FormDataHelper";
import {
  CLIENT_FILE_TYPES,
  UPDATE_CLIENT_FILE_DELIVERABLES,
} from "../../jwt/_services/axiousURL";
import { GeneralServices } from "../../jwt/_services/General.services";
import swal from "sweetalert";

const UserFileTypes = ({ profileId }) => {
  const [selectedTypes, setSelectedTypes] = useState([]);

  const handleSave = () => {
    let helper = FormDataHelper();
    helper.append("client_profile_id", profileId);
    helper.append("file_deliverables", JSON.stringify(selectedTypes));
    GeneralServices.postRequest(helper, UPDATE_CLIENT_FILE_DELIVERABLES).then(
      (resp) => {
        swal("Updated successfully", {
          icon: "success",
        });
      },
      (error) => {
        console.log("failed to log");
      }
    );
  };
  const handleChange = (event) => {
    let tmpSelctedArr = [...selectedTypes];
    let value = event.target.value;
    let index = tmpSelctedArr.indexOf(value);
    if (index !== -1) {
      tmpSelctedArr.splice(index, 1);
      setSelectedTypes(tmpSelctedArr);
    } else {
      tmpSelctedArr.push(value);
      setSelectedTypes(tmpSelctedArr);
    }
  };

  const fetchUserSelectedTypes = () => {
    let helper = FormDataHelper();
    helper.append("client_profile_id", profileId);
    GeneralServices.postRequest(helper, CLIENT_FILE_TYPES).then((resp) => {
      let selectedFileType = resp.data;
      let tmp = Array();
      selectedFileType.forEach((element) => {
        tmp.push(element.file_deliverable_id);
      });
      setSelectedTypes(tmp);
    });
  };

  const isSelected = (value) => {
    let index = selectedTypes.indexOf(value);
    if (index == -1) return false;
    return true;
  };

  useEffect(() => {
    fetchUserSelectedTypes();
  }, []);

  return (
    <>
      <div className="profile-parent">
        <div className="head-text">
          <div className="container secnd">
            <h3>Preferred File Type</h3>
            <div className="para-space">
              <p className="paraa">
                All Future design request will default to this type dont worry
                you can update settings per design needed
              </p>
            </div>
            <div className="check-space">
              <input
                type="checkbox"
                id="any"
                name="fileType"
                value="1"
                checked={isSelected("1")}
                onChange={handleChange}
              />
              <label htmlFor="any"> Any</label>
            </div>
            <div className="check-space">
              <input
                type="checkbox"
                id="PhotoShop"
                name="fileType"
                value="2"
                checked={isSelected("2")}
                onChange={handleChange}
              />
              <label htmlFor="PhotoShop"> PhotoShop</label>
            </div>
            <div className="check-space">
              <input
                type="checkbox"
                id="Illustrator"
                name="fileType"
                value="3"
                checked={isSelected("3")}
                onChange={handleChange}
              />
              <label htmlFor="Illustrator"> Illustrator</label>
            </div>
            <div className="check-space">
              <input
                type="checkbox"
                id="inDesign"
                name="fileType"
                value="4"
                checked={isSelected("4")}
                onChange={handleChange}
              />
              <label htmlFor="inDesign"> inDesign</label>
            </div>
            <div className="check-space">
              <input
                type="checkbox"
                id="PDF"
                name="fileType"
                value="5"
                checked={isSelected("5")}
                onChange={handleChange}
              />
              <label htmlFor="PDF"> PDF</label>
            </div>
            <div className="submit-pp" onClick={handleSave}>
              <input type="submit" className="submit" value="Save" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserFileTypes;
