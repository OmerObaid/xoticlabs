import downArrow from "../../../assets/images/header-icons/down-arrow.png";
import projectBoardIcon from "../../../assets/images/header-icons/projectBoard icon.png";
import bellIcon from "../../../assets/images/header-icons/bell.png";
import brandsIcon from "../../../assets/images/header-icons/brands icon.png";
import dummyProfileIcon from "../../../assets/images/header-icons/dummy-profile-icon.png";

import { Link } from "react-router-dom";
import HeaderBrandListing from "../../../components/headerBrandListing";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AuthenticationService } from "../../../jwt/_services";
import { getHeaderTagPrpos, openInNewTab } from "../../../helper/siteHelper";

const DesktopHeader = ({ getActiveBrand, userName, ...props }) => {
  const headerSettings = useSelector((state) => state.headerSettings);
  const [showBrandList, setShowBrandList] = useState(false);
  const [showRightMenu, setshowRightMenu] = useState(false);
  let info = getHeaderTagPrpos(headerSettings);

  const openProjectsPage = () => {
    const { from } = props.location.state || {
      from: { pathname: `/brand/${headerSettings.activeBrandId}` },
    };
    props.history.push(from);
  };

  const handleHelpCenterClick = () => {};

  useEffect(() => {
    info = getHeaderTagPrpos(headerSettings);
  }, [headerSettings]);

  return (
    <>
      <ul className="realMenu">
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
                ulClass={"dropList active"}
                {...props}
              />
            )}
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
        <li className="mr-a">
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
          <img
            className="icon-img-bel disabled-buttons"
            src={bellIcon}
            alt="bell icon"
          />
        </li>
        <li
          onClick={() => setshowRightMenu(!showRightMenu)}
          style={{ cursor: "pointer" }}
        >
          <img src={dummyProfileIcon} alt="profile" />
          <strong>{userName}</strong>
          <img src={downArrow} alt="down-arrow" />
          <ul className={`dropList ${showRightMenu ? "active" : ""}`}>
            <li>
              <Link to="/company">Company Profile</Link>
            </li>
            <li>
              <Link to="/user">My Profile</Link>
            </li>
            <li
              onClick={() => {
                openInNewTab("https://xoticlabs.com/help-center/");
              }}
            >
              Help Center
            </li>
            {/* <li>Notification Settings</li> */}

            <li onClick={AuthenticationService.logout}>Log Out</li>
          </ul>
        </li>
      </ul>
    </>
  );
};

export default DesktopHeader;
