import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getClientName } from "../../../helper/siteHelper";

/*--------------------------------------------------------------------------------*/
/* Import images which are need for the HEADER                                    */
/*--------------------------------------------------------------------------------*/

import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

export default (props) => {
  const userName = getClientName();
  const headerSettings = useSelector((state) => state.headerSettings);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

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
        {headerSettings.accountPauseStatus == "Y" && (
          <div
            style={{
              width: "100%",
              height: "40px",
              lineHeight: "40px",
              backgroundColor: "#fdde6c",
              textAlign: "center",
            }}
          >
            <label style={{ color: "black", textAlign: "center" }}>
              Your account is on Pause.
            </label>
          </div>
        )}
        {headerSettings.accountSuspendedStatus == "Y" && (
          <div
            style={{
              width: "100%",
              height: "40px",
              lineHeight: "40px",
              backgroundColor: "#fdde6c",
              textAlign: "center",
            }}
          >
            <label style={{ color: "black", textAlign: "center" }}>
              Your account is Suspended.
            </label>
          </div>
        )}
        {headerSettings.accountCancelStatus == "Y" && (
          <div
            style={{
              width: "100%",
              height: "40px",
              lineHeight: "40px",
              backgroundColor: "#FF3131",
              textAlign: "center",
            }}
          >
            <label style={{ color: "black", textAlign: "center" }}>
              Your account is Canceled.
            </label>
          </div>
        )}
        <main className="cont">
          <div className="logo">
            {getActiveBrand().brandImage && (
              <img src={getActiveBrand().brandImage} alt="logo" />
            )}
          </div>
          <DesktopHeader
            getActiveBrand={getActiveBrand}
            userName={userName}
            {...props}
          />
          <MobileHeader
            getActiveBrand={getActiveBrand}
            userName={userName}
            {...props}
          />
        </main>
      </header>
    </>
  );
};
