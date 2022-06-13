import downArrowIcon from "../../../assets/images/header-icons/down-arrow.png";
import projectBoardIcon from "../../../assets/images/header-icons/projectBoard icon.png";
import brandsIcon from "../../../assets/images/header-icons/brands icon.png";
import dummyProfileIcon from "../../../assets/images/header-icons/dummy-profile-icon.png";
import downArrowBlackIcon from "../../../assets/images/header-icons/down-arrow-black.png";

import { useState } from "react";
import { useSelector } from "react-redux";
import HeaderBrandListing from "../../../components/headerBrandListing";
import { Link } from "react-router-dom";
import { getHeaderTagPrpos } from "../../../helper/siteHelper";

const MobileHeaderSubMenu = ({
  getActiveBrand,
  headerSubMenuClossCallBack,
  userName,
  ...props
}) => {
  const headerSettings = useSelector((state) => state.headerSettings);
  let info = getHeaderTagPrpos(headerSettings);
  const [brands, setBrands] = useState(headerSettings.brandList);
  const [showBrandListing, setshowBrandListin] = useState(false);

  const openProjectsPage = () => {
    const { from } = props.location.state || {
      from: { pathname: `/brand/${headerSettings.activeBrandId}` },
    };
    props.history.push(from);
  };

  return (
    <>
      <ul className="fakeMenu active">
        {brands.length && (
          <li onClick={() => setshowBrandListin(!showBrandListing)}>
            <span>{getActiveBrand().brandName}</span>
            <img
              className="icon-img"
              src={downArrowBlackIcon}
              alt="down-arrow"
            />
            {showBrandListing && (
              <HeaderBrandListing
                brands={brands}
                ulClass={"dropList-fake active"}
                headerSubMenuClossCallBack={headerSubMenuClossCallBack}
                {...props}
              />
            )}
            <ul className="dropList-fake">
              <li>User Profile</li>
              <li>Log Out</li>
            </ul>
          </li>
        )}
        <li>
          <a onClick={openProjectsPage}>
            <img
              className="icon-img"
              src={projectBoardIcon}
              alt="projectBoard"
            />
            <span>Project Board</span>
          </a>
        </li>
        <li className="mr-a" onClick={headerSubMenuClossCallBack}>
          <Link to="/brands">
            <img className="icon-img" src={brandsIcon} alt="brands" />
            <span>Brands</span>
          </Link>
        </li>
        <li>
          <Link to="/company">
            <button
              type="button"
              style={{ backgroundColor: info.color, opacity: info.opacity }}
            >
              {info.title}
            </button>
          </Link>
        </li>
        <li>
          <img src={dummyProfileIcon} alt="profile" />
          <strong>{userName}</strong>
          <img src={downArrowBlackIcon} alt="down-arrow" />
          <ul className="dropList-fake">
            <li>User Profile</li>
            <li>Log Out</li>
          </ul>
        </li>
      </ul>
    </>
  );
};

export default MobileHeaderSubMenu;
