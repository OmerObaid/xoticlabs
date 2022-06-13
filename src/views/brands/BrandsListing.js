import React from "react";

import activeBrandFolderIcon from "../../assets/images/active-brand-icon.png";
import brandFolderIcon from "../../assets/images/brand-icon.png";
import gearIcon from "../../assets/images/gear.png";

import editIcon from "../../assets/images/brand-listing-icon/icon Edit project.png";
import deleteIcon from "../../assets/images/brand-listing-icon/icon Delete project.png";

import { BRAND_PAGE_TITLE } from "../constants";
import { useEffect, useState } from "react";
import { GeneralServices } from "../../jwt/_services/General.services";
import { FormDataHelper } from "../../jwt/_helpers/FormDataHelper";
import { BRANDS_LISTING, BRAND_DELETE } from "../../jwt/_services/axiousURL";
import { AuthenticationService } from "../../jwt/_services";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveBrandId,
  setBrandList,
} from "../../redux/headerSettings/Action";

import swal from "sweetalert";
import CreateNewBrand from "../../components/brand/createNewBrand";
import EditBrand from "./editBrand";
import { isAccountPaused } from "../../helper/accountHelper";

const BrandsListing = (props) => {
  const clientId = AuthenticationService.currentUserValue.id;
  const [brands, setBrands] = useState([]);
  const [showCreateNewBrand, setShowCreateNewBrand] = useState(false);
  const [showEditBrand, setShowEditBrand] = useState(false);
  const [selectedBrandIdForEdit, setSelectedBrandIdForEdit] = useState("");
  const dispatch = useDispatch();
  const headerSettings = useSelector((state) => state.headerSettings);

  useEffect(() => {
    fetchBrands();
    document.title = BRAND_PAGE_TITLE;
  }, []);

  const fetchBrands = () => {
    var bodyHelper = FormDataHelper();
    bodyHelper.append("client_id", clientId);

    GeneralServices.postRequest(bodyHelper, BRANDS_LISTING).then(
      (successResponse) => {
        setBrands(successResponse.data);
        dispatch(setBrandList(successResponse.data));
      }
    );
  };

  const getTitle = (title) => {
    var length = 5;
    if (title == null) return "";
    if (title.length <= length) return title;

    title = title.substring(0, length);
    return title + " ...";
  };

  const closeCreateNewBrandOverlay = (callFetchBrands = false) => {
    setShowCreateNewBrand(false);
    setShowEditBrand(false);
    if (callFetchBrands) fetchBrands();
  };

  const deleteProject = (brandId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        var helper = FormDataHelper();
        helper.append("brand_id", brandId);
        GeneralServices.postRequest(helper, BRAND_DELETE).then(
          (successResponse) => {
            swal("Brand deleted successfully!", {
              icon: "success",
            });
            fetchBrands();
          }
        );
      } else {
        console.log("User oppted to not delete the project");
      }
    });
  };

  const handleBrandClicked = (brandId) => {
    dispatch(setActiveBrandId(brandId));
    const { from } = props.location.state || {
      from: { pathname: `/brand/${brandId}` },
    };
    props.history.push(from);
  };

  const handleEditBrandClick = (brandId) => {
    setSelectedBrandIdForEdit(brandId);
    setShowEditBrand(true);
  };

  return (
    <>
      <section className="blp">
        <main className="cont">
          <div className="pageHead">
            <h1>Brands</h1>
            {!isAccountPaused(headerSettings) && (
              <button onClick={() => setShowCreateNewBrand(true)}>
                + Create brand
              </button>
            )}
          </div>

          {showCreateNewBrand && (
            <CreateNewBrand crossButtonCallBack={closeCreateNewBrandOverlay} />
          )}

          {showEditBrand && (
            <EditBrand
              brandId={selectedBrandIdForEdit}
              crossButtonCallBack={closeCreateNewBrandOverlay}
            />
          )}

          <div className="brandsBody">
            <h4>
              Brands <span>({brands.length})</span>
            </h4>
            <div className="brandsList">
              {brands.map((brand, key) => {
                return (
                  <div className="brandsList_single" key={key}>
                    <div className="brandsList_head">
                      <div
                        onClick={() => handleBrandClicked(brand.brand_id)}
                        className="brandsList_left"
                      >
                        <img
                          src={
                            brand.brand_id == headerSettings.activeBrandId
                              ? activeBrandFolderIcon
                              : brandFolderIcon
                          }
                          alt="brand-icon"
                        />
                        <h3>{getTitle(brand.title)}</h3>
                      </div>
                      <button className="option">
                        <img src={gearIcon} alt="gear-icon" />{" "}
                        <span>Options</span>
                        <ul className="optionMenu">
                          <h3>Options</h3>
                          <li
                            onClick={() => handleEditBrandClick(brand.brand_id)}
                          >
                            <img src={editIcon} alt="" />
                            Edit Brand
                          </li>
                          <li onClick={() => deleteProject(brand.brand_id)}>
                            <img src={deleteIcon} alt="" />
                            Delete Brand
                          </li>
                        </ul>
                      </button>
                    </div>
                    <p className="brandsList-p">
                      Used in {brand.used_id} projects
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default BrandsListing;
