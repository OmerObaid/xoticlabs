import crossSignIcon from '../../assets/images/new-brand-icons/cross-sign.png'
import uploadIcon from '../../assets/images/new-brand-icons/upload.png'
import addNewColorIcon from '../../assets/images/new-brand-icons/add new color.png'
import checkMarkIcon from '../../assets/images/new-brand-icons/affirmative-check-mark.png'

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { GeneralServices } from '../../jwt/_services/General.services';
import { FormDataHelper } from '../../jwt/_helpers/FormDataHelper';
import { logDOM } from '@testing-library/react';


const CreateNewBrand = ({ crossButtonCallBack }) => {
    return <>

        <div className="cnp createNew-overLay active">
            <main>
                <img onClick={crossButtonCallBack} src={crossSignIcon} alt="cross" className="cross" />
                <h1 className="cnp-head">Create a brand</h1>
                <p className="cnp-para">
                    A brands is a folder containing information and assets for anyone or anything that you
                    need designs for regularly. Create a brand for clients, products, or use it to
                    categorize and organize your design projects.
                </p>

                <Formik

                    initialValues={{
                        brandName: '',
                        industry: '',
                        website: '',
                        brandGuide: '',
                        attachment: ''
                    }}
                    validationSchema={Yup.object().shape({
                        brandName: Yup.string().required("Brand name is required"),
                        industry: Yup.string().required('Industry is required'),
                        website: Yup.string(),
                    })}
                    onSubmit={(
                        { brandName, industry, website, brandGuide, attachment },
                        { setStatus, setSubmitting }
                    ) => {

                        console.log(brandName, industry, website, brandGuide, attachment);
                        return;
                        setStatus();
                        var helper = FormDataHelper();
                        GeneralServices.postRequest(helper, '').then(
                            (successResponse) => {
                            },
                            (error) => {
                                // console.log(error);
                                setSubmitting(false);
                                setStatus(error);
                            }
                        );
                    }}

                    render={({ errors, status, touched, isSubmitting }) => (

                        <Form action="">
                            <div className="inputField">
                                <label className="inputLabel required" htmlFor="brandName">Brand name</label><br />
                                <div className="inputDiv input">
                                    <Field type="text" id="brandName" name="brandName" required />
                                </div>
                            </div>
                            <div className="inputField">
                                <label className="inputLabel required" htmlFor="industry">Industry</label><br />
                                <div className="inputDiv">
                                    <Field type="text" name="industry" className="input" id="industry" required />
                                </div>
                            </div>

                            <div className="inputField description">
                                <label htmlFor="#desc" className="inputLabel required">Description</label>

                                <p className="format-inst">
                                    Tell us about this brand. What product/service does it provide? What’s special about
                                    it?
                                </p>
                                {/* <textarea name="desc" id="desc" required placeholder="Insert text here..."></textarea> */}
                                <CKEditor
                                    editor={ClassicEditor}
                                    config={{
                                        removePlugins: ['ImageUpload', 'EasyImage', 'MediaEmbed', 'Link', 'CKFinder'],
                                    }}
                                    data="<p>Insert your text here</p>"
                                    onReady={editor => {
                                        // You can store the "editor" and use when it is needed.
                                        console.log('Editor is ready to use!', editor);
                                    }}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        console.log({ event, editor, data });
                                    }}
                                    onBlur={(event, editor) => {
                                        console.log('Blur.', editor);
                                    }}
                                    onFocus={(event, editor) => {
                                        console.log('Focus.', editor);
                                    }}
                                />

                            </div>
                            <div className="inputField">
                                <label className="inputLabel" htmlFor="website">Website</label><br />
                                <div className="inputDiv">
                                    <Field type="text" name="website" className="input" id="industry" />
                                </div>
                            </div>
                            <div className="inputField">
                                <h3 className="inputLabel brandGuide-head">Brand guideline</h3>
                                <p className="format-inst">Upload your existing brand guideline if you have one.</p>
                                <Field type="file" name="brandGuide" id="brandGuide" hidden />
                                <label htmlFor="brandGuide">
                                    <img src={uploadIcon} alt="upload" />
                                    <span>Upload guideline</span>
                                </label>
                            </div>
                            <div className="inputField">
                                <h3 className="inputLabel">Brand Colors</h3>
                                <div className="brandColors">
                                    <div className="brandColors_single createColor">
                                        <img src={addNewColorIcon} alt="add new color" />
                                    </div>
                                    <div className="brandColors_single">
                                        <div className="color white"></div>
                                        <span className="hex">#fff</span>
                                        <button className="remove">Remove</button>
                                    </div>
                                    <div className="brandColors_single">
                                        <div className="color purple"></div>
                                        <span className="hex">#8235dc</span>
                                        <button className="remove">Remove</button>
                                    </div>
                                </div>
                            </div>
                            <div className="inputField">
                                <p className="inputLabel">Attachments</p>
                                <div className="attach">
                                    <ul className="attach-points">
                                        <li>
                                            <img src={checkMarkIcon} alt="check mark" />
                                            <p>Your logos</p>
                                        </li>
                                        <li>
                                            <img src={checkMarkIcon} alt="check mark" />
                                            <p>Product images</p>
                                        </li>
                                        <li>
                                            <img src={checkMarkIcon} alt="check mark" />
                                            <p>Fonts</p>
                                        </li>
                                        <li>
                                            <img src={checkMarkIcon} alt="check mark" />
                                            <p>Icons</p>
                                        </li>
                                    </ul>
                                    <ul className="attach-points">
                                        <li>
                                            <img src={checkMarkIcon} alt="check mark" />
                                            <p>Any existing designs/graphics</p>
                                        </li>
                                        <li>
                                            <img src={checkMarkIcon} alt="check mark" />
                                            <p>Marketing marterials/ads</p>
                                        </li>
                                        <li>
                                            <img src={checkMarkIcon} alt="check mark" />
                                            <p>Preferred stock photos</p>
                                        </li>
                                        <li>
                                            <img src={checkMarkIcon} alt="check mark" />
                                            <p>Templates/PSD/AI files</p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="attach-cont">
                                    <Field type="file" name="attachment" id="atch" hidden />
                                    <label htmlFor="atch"><img src={uploadIcon} alt="upload icon" /> Upload files</label>
                                    <p>
                                        Upload or drag & drop any images, files, or examples that may be helpful
                                        explaining your project here.
                                    </p>
                                </div>
                            </div>

                            <button type="submit" className="createBrandBtn" disabled={isSubmitting}>Create brand</button>
                        </Form>
                    )}
                />
            </main>
        </div>

    </>
}

export default CreateNewBrand
