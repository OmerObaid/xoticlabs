import checkCircle from "../../assets/images/check circle.png";
import anyFileIcon from "../../assets/images/create-project/any file.png";
import photoshopIcon from "../../assets/images/create-project/photoshop.png";
import pdfIcon from "../../assets/images/create-project/pdf.png";
import inDesignIcon from "../../assets/images/create-project/inDesign.png";
import illustratorIcon from "../../assets/images/create-project/illustrator.png";
import { Field } from "formik";

const FileDeliverables = ({ children }) => {
  return (
    <>
      <div className="inputField">
        <label className="inputLabel">File deliverables</label>
        <p className="format-inst">Select which source file type you want.</p>
        <div className="deliverables">
          <Field type="radio" name="deliverable" hidden id="any" value="1" />
          <label htmlFor="any" className="deliverables_single">
            <img src={anyFileIcon} alt="any file" />
            <h3>Any</h3>
            <img src={checkCircle} alt="check-circle" />
          </label>

          <Field type="radio" name="deliverable" hidden id="psd" value="2" />
          <label htmlFor="psd" className="deliverables_single">
            <img src={photoshopIcon} alt="psd file" />
            <h3>Photoshop</h3>
            <img src={checkCircle} alt="check-circle" />
          </label>

          <Field
            type="radio"
            name="deliverable"
            hidden
            id="illustrator"
            value="illustrator"
            hidden
          />
          <label htmlFor="illustrator" className="deliverables_single">
            <img src={illustratorIcon} alt="illustrator file" />
            <h3>Illustrator</h3>
            <img src={checkCircle} alt="check-circle" />
          </label>

          <Field
            type="radio"
            name="deliverable"
            hidden
            id="indesign"
            value="3"
          />
          <label htmlFor="indesign" className="deliverables_single">
            <img src={inDesignIcon} alt="indesign file" />
            <h3>inDesign</h3>
            <img src={checkCircle} alt="check-circle" />
          </label>

          <Field type="radio" name="deliverable" hidden id="pdf" value="4" />
          <label htmlFor="pdf" className="deliverables_single">
            <img src={pdfIcon} alt="pdf file" />
            <h3>PDF</h3>
            <img src={checkCircle} alt="check-circle" />
          </label>
        </div>
        {children}
      </div>
    </>
  );
};

export default FileDeliverables;
