import { useEffect, useState } from "react";
import checkCircle from "../../assets/images/check circle.png";
import { FormDataHelper } from "../../jwt/_helpers/FormDataHelper";
import {
  CATEGORIES_LISTING,
  SUB_CATEGORIES_LISTING,
} from "../../jwt/_services/axiousURL";
import { GeneralServices } from "../../jwt/_services/General.services";
import searchIcon from "../../assets/images/brand-page-icons/magnifying-glass.png";
import useFocus from "../customHooks/useFocus";

const CategorySearch = ({
  getSelectedSubCategoryId,
  setFieldValue,
  children,
}) => {
  const [inputRef, setInputFocus] = useFocus();
  const [allCategories, setAllCategories] = useState([]);
  const [allSubCategories, setAllSubCategories] = useState([]);
  const [searchListingData, setSearchListingData] = useState([]);

  const [showSearchListing, setShowSearchListing] = useState(false);
  const [showSelectedSubCategory, setShowSelectedSubCategory] = useState(false);

  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const [searchText, setSearchText] = useState("");

  const fetchCategories = () => {
    var helper = FormDataHelper();
    GeneralServices.postRequest(helper, CATEGORIES_LISTING).then(
      (successResponse) => {
        var categories = successResponse.data;
        setAllCategories(categories);
      }
    );
  };
  const fetchSubCategories = () => {
    var helper = FormDataHelper();
    GeneralServices.postRequest(helper, SUB_CATEGORIES_LISTING).then(
      (successResponse) => {
        var subCategories = successResponse.data;
        setAllSubCategories(subCategories);
      }
    );
  };

  const readyDataForSearchListing = () => {
    if (allCategories.length < 1) {
      setSearchListingData([]);
      return;
    }
    var tempArray = Array();

    allCategories.forEach((singleCategory) => {
      var relatedSubCat = allSubCategories.filter((subCategory) => {
        if (
          subCategory.category_id === singleCategory.id &&
          (subCategory.title.toLowerCase().includes(searchText.toLowerCase()) ||
            singleCategory.title
              .toLowerCase()
              .includes(searchText.toLowerCase()))
        )
          return true;
        else return false;
      });

      if (relatedSubCat.length > 0) {
        var tempObj = {
          categoryId: singleCategory.id,
          categoryTitle: singleCategory.title,
          subCategories: relatedSubCat,
        };
        tempArray.push(tempObj);
      }
    });
    setSearchListingData(tempArray);
  };

  const handleSubCategoryClick = (e) => {
    var categoryId = e.target.getAttribute("data-value");
    var categoryTitle = e.target.getAttribute("data-title");

    getSelectedSubCategoryId(categoryId);
    setFieldValue("subCategoryId", categoryId);
    setSelectedSubCategory(categoryTitle);

    setShowSearchListing(false);
    setShowSelectedSubCategory(true);
  };

  const handleChangeCategoryClick = () => {
    getSelectedSubCategoryId("");
    setFieldValue("subCategoryId", "");
    setSelectedSubCategory("");
    setInputFocus();
    setShowSearchListing(true);
    setShowSelectedSubCategory(false);

    return false; // because of anchor tag
  };

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, []);

  useEffect(() => {
    readyDataForSearchListing();
  }, [allCategories, allSubCategories, searchText]);

  return (
    <>
      <div className="inputField">
        <label htmlFor="catInput" className="inputLabel">
          Design Catagory
        </label>

        <div className="input desCat">
          {showSelectedSubCategory && (
            <div className="desCat_selected active">
              <img src={checkCircle} alt="check circle" />
              <p>
                {selectedSubCategory}{" "}
                <a onClick={handleChangeCategoryClick}>Change catagory</a>
              </p>
            </div>
          )}
          <input
            type="text"
            id="catInput"
            value={searchText}
            onBlur={() => setShowSearchListing(false)}
            onChange={(e) => setSearchText(e.target.value)}
            // onClick={() => setShowSearchListing(!showSearchListing)}
            ref={inputRef}
            onFocus={() => setShowSearchListing(true)}
          />
          <img className="searchCat" src={searchIcon} alt="magnifying-glass" />
          {showSearchListing && (
            <div className="cat active">
              <div className="cat-block">
                {searchListingData.map((category) => {
                  return (
                    <div key={category.categoryId}>
                      <h3 className="cat-head">{category.categoryTitle}</h3>
                      <ul className="cat-ul">
                        {category.subCategories.map((subCategory) => {
                          return (
                            <li
                              key={subCategory.id}
                              onMouseDown={handleSubCategoryClick}
                              data-value={subCategory.id}
                              data-title={subCategory.title}
                            >
                              {subCategory.title}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {children}
        </div>
        {/* <p className="disclaim">
          <span>Disclaimer</span> : Poster may cause project to exceed 48 hour
          delivery time
        </p> */}
      </div>
    </>
  );
};

export default CategorySearch;
