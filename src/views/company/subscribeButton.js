import React from "react";

const SubscribeButton = ({
  companyInfo,
  plandId,
  title,
  activePlanId,
  handleSubscriblePlan,
}) => {
  if (companyInfo.is_pause == "Y") {
    return (
      <button
        onClick={() => handleSubscriblePlan(plandId, title)}
        className="sub-btn"
      >
        Re Activate & Subscribe
      </button>
    );
  } else if (
    companyInfo.is_suspended == "Y" ||
    companyInfo.is_canceled == "Y"
  ) {
    return (
      <button
        onClick={() => handleSubscriblePlan(plandId, title)}
        className="sub-btn"
      >
        Subscribe
      </button>
    );
  } else if (plandId == activePlanId) {
    return <></>;
  } else {
    return (
      <button
        onClick={() => handleSubscriblePlan(plandId, title)}
        className="sub-btn"
      >
        Subscribe
      </button>
    );
  }
};

export default SubscribeButton;
