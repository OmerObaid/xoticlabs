import {
  ACCOUNT_CANCEL_STATUS,
  ACCOUNT_PAUSE_STATUS,
  ACCOUNT_PLAN_TITLE,
  ACCOUNT_SUSPENDED_STATUS,
  ACTIVE_BRAND,
  BRAND_LIST,
} from "../constants";

export const setActiveBrandId = (payload) => {
  return {
    type: ACTIVE_BRAND,
    payload,
  };
};

export const setBrandList = (payload) => {
  return {
    type: BRAND_LIST,
    payload,
  };
};

export const setAccountPauseStatus = (payload) => {
  return {
    type: ACCOUNT_PAUSE_STATUS,
    payload,
  };
};

export const setAccountCancelStatus = (payload) => {
  return {
    type: ACCOUNT_CANCEL_STATUS,
    payload,
  };
};

export const setAccountSuspendedStatus = (payload) => {
  return {
    type: ACCOUNT_SUSPENDED_STATUS,
    payload,
  };
};

export const setAccountPlanTitle = (payload) => {
  return {
    type: ACCOUNT_PLAN_TITLE,
    payload,
  };
};
