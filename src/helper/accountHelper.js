import { useSelector } from "react-redux";

export function isAccountCanceled(headerSettings) {
  return headerSettings.accountCancelStatus == "Y" ? true : false;
}

export function isAccountSuspended(headerSettings) {
  return headerSettings.accountSuspendedStatus == "Y" ? true : false;
}

export function isAccountPaused(headerSettings) {
  return headerSettings.accountPauseStatus == "Y" ? true : false;
}
