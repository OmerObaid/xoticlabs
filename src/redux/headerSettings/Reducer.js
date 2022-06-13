import {
  ACCOUNT_CANCEL_STATUS,
  ACCOUNT_PAUSE_STATUS,
  ACCOUNT_PLAN_TITLE,
  ACCOUNT_SUSPENDED_STATUS,
  ACTIVE_BRAND,
  BRAND_LIST,
} from "../constants";

const INIT_STATE = {
  activeBrandId: "0",
  brandList: [],
  accountPauseStatus: "N",
  accountCancelStatus: "N",
  accountSuspendedStatus: "N",
  accountPlanTitle: "",
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACTIVE_BRAND:
      return {
        ...state,
        activeBrandId: action.payload,
      };
    case BRAND_LIST:
      return {
        ...state,
        brandList: action.payload,
      };

    case ACCOUNT_PAUSE_STATUS:
      return {
        ...state,
        accountPauseStatus: action.payload,
      };

    case ACCOUNT_CANCEL_STATUS:
      return {
        ...state,
        accountCancelStatus: action.payload,
      };

    case ACCOUNT_SUSPENDED_STATUS:
      return {
        ...state,
        accountSuspendedStatus: action.payload,
      };

    case ACCOUNT_PLAN_TITLE:
      return {
        ...state,
        accountPlanTitle: action.payload,
      };

    default:
      return state;
  }
};
