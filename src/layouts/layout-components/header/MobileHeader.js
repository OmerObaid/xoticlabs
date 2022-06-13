import bellIcon from "../../../assets/images/header-icons/bell.png";
import blackBellIcon from "../../../assets/images/header-icons/bell-black.png";
import { useState } from "react";
import MobileHeaderSubMenu from "./MobileHeaderSubMenu";

const MobileHeader = ({ getActiveBrand, userName, ...props }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const headerSubMenuClossCallBack = () => {
    setShowMobileMenu(false);
  };
  return (
    <>
      {showMobileMenu && (
        <MobileHeaderSubMenu
          getActiveBrand={getActiveBrand}
          headerSubMenuClossCallBack={headerSubMenuClossCallBack}
          userName={userName}
          {...props}
        />
      )}

      <img
        src={blackBellIcon}
        alt="bell icon"
        className={`icon-img-bel icon-img-bel-mob blackBell ${
          showMobileMenu ? "active" : ""
        }`}
      />
      <img
        src={bellIcon}
        alt="bell icon"
        className={`icon-img-bel icon-img-bel-mob whiteBell ${
          showMobileMenu ? "active" : ""
        }`}
      />
      <div
        className={showMobileMenu ? "burger active" : "burger"}
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        <div className="line l1"></div>
        <div className="line l2"></div>
        <div className="line l3"></div>
      </div>
    </>
  );
};

export default MobileHeader;
