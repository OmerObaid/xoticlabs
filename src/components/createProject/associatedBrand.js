import brandIcon from "../../assets/images/brand-icon.png";
import activeBrandIcon from "../../assets/images/active-brand-icon.png";
import createNewBrandIcon from "../../assets/images/create-project/create-new-brand.png";
import { useEffect } from "react";
import { FormDataHelper } from "../../jwt/_helpers/FormDataHelper";
import { GeneralServices } from "../../jwt/_services/General.services";
import { BRANDS_LISTING } from "../../jwt/_services/axiousURL";
import { useState } from "react";
import { AuthenticationService } from "../../jwt/_services";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setBrandList } from "../../redux/headerSettings/Action";
import { Field } from "formik";

const AssociatedBrand = ({
  showCreateBrandOverLay,
  shouldUpdateBrand,
  setFieldValue,
  children,
}) => {
  const clientId = AuthenticationService.currentUserValue.id;
  const headerSettings = useSelector((state) => state.headerSettings);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const dispatch = useDispatch();

  const handleCreateBrandClick = () => {
    showCreateBrandOverLay();
  };

  const handleBrandClick = (e) => {
    var brandId = e.target.getAttribute("data-value");
    setFieldValue("associatedBrand", brandId);
    setSelectedBrand(brandId);
  };

  const fetchBrands = () => {
    var helper = FormDataHelper();
    helper.append("client_id", clientId);
    GeneralServices.postRequest(helper, BRANDS_LISTING).then(
      (successResponse) => {
        var brands = successResponse.data;
        setBrands(brands);
        dispatch(setBrandList(brands));
      }
    );
  };
  useEffect(() => {
    if (brands.length < 1 || shouldUpdateBrand) {
      fetchBrands();
      shouldUpdateBrand = false;
    }
  }, [shouldUpdateBrand]);

  return (
    <>
      <div className="inputField">
        <p className="inputLabel">Associated brand</p>
        <div className="assocBrands">
          {brands.length > 0 &&
            brands.map((brand) => {
              return (
                <div
                  className="assocBrands_single"
                  key={brand.brand_id}
                  onClick={handleBrandClick}
                  data-value={brand.brand_id}
                >
                  <input type="radio" name="associatedBrand" hidden />
                  <div className="assocBrands_head" data-value={brand.brand_id}>
                    <img
                      src={
                        brand.brand_id == selectedBrand
                          ? activeBrandIcon
                          : brandIcon
                      }
                      data-value={brand.brand_id}
                      alt="brand"
                    />
                    <label data-value={brand.brand_id}>{brand.title}</label>
                  </div>
                  <p
                    data-value={brand.brand_id}
                  >{`Used in ${brand.used_id} projects`}</p>
                </div>
              );
            })}
          <div className="assocBrands_single" onClick={handleCreateBrandClick}>
            <div className="assocBrands_head">
              <img src={createNewBrandIcon} alt="create brand" />
              New Brand
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default AssociatedBrand;
