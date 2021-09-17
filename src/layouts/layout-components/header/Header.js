import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AuthenticationService } from "../../../jwt/_services";

/*--------------------------------------------------------------------------------*/
/* Import images which are need for the HEADER                                    */
/*--------------------------------------------------------------------------------*/
import bellIcon from "../../../assets/images/header-icons/bell.png";
import downArrow from "../../../assets/images/header-icons/down-arrow.png";
import projectBoardIcon from "../../../assets/images/header-icons/projectBoard icon.png";
import brandsIcon from "../../../assets/images/header-icons/brands icon.png";
import dummyProfileIcon from "../../../assets/images/header-icons/dummy-profile-icon.png";
import { Link } from "react-router-dom";
import HeaderBrandListing from "../../../components/headerBrandListing";

export default (props) => {
  const userName =
    AuthenticationService.currentUserValue.first_name +
    " " +
    AuthenticationService.currentUserValue.last_name;
  const headerSettings = useSelector((state) => state.headerSettings);
  const [showBrandList, setShowBrandList] = useState(false);

  const getActiveBrand = () => {
    var brand = headerSettings.brandList.find((brand) => {
      return brand.brand_id == headerSettings.activeBrandId;
    });

    if (!brand && headerSettings.brandList.length < 1) {
      return { brandName: "", brandImage: "" };
    }
    if (!brand) brand = headerSettings.brandList[0];

    return { brandName: brand.title, brandImage: brand.logo };
  };

  return (
    <>
      <header>
        <main className="cont">
          <div className="logo">
            <img src={getActiveBrand().brandImage} alt="logo" />
          </div>
          <ul>
            {headerSettings.brandList.length > 0 && (
              <li
                className="headerBrandList"
                onClick={() => {
                  setShowBrandList(!showBrandList);
                }}
              >
                <h3>{getActiveBrand().brandName}</h3>
                <img className="icon-img" src={downArrow} alt="down-arrow" />
                {showBrandList && (
                  <HeaderBrandListing
                    brands={headerSettings.brandList}
                    {...props}
                  />
                )}
              </li>
            )}

            <li>
              <a href="#" className="disabled-buttons">
                <img
                  className="icon-img"
                  src={projectBoardIcon}
                  alt="projectBoard"
                />
                <span>Project Board</span>
              </a>
            </li>
            <li className="mr-a">
              <Link to="/brands">
                <img className="icon-img" src={brandsIcon} alt="brands" />
                <span>Brands</span>
              </Link>
            </li>
            <li>
              <button type="button" className="disabled-buttons">
                Outsourcer plan
              </button>
            </li>
            <li>
              <img
                className="icon-img-bel disabled-buttons"
                src={bellIcon}
                alt="bell icon"
              />
            </li>
            <li>
              <img src={dummyProfileIcon} alt="profile" />
              <strong>{userName}</strong>
              <img src={downArrow} alt="down-arrow" />
              <ul className="dropList">
                <li>Action</li>
                <li>Another Action</li>
                <li>Action Again</li>
              </ul>
            </li>
          </ul>
          <div className="burger">
            <div className="line l1"></div>
            <div className="line l2"></div>
            <div className="line l3"></div>
          </div>
        </main>
      </header>
    </>
  );
};
