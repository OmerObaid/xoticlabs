import { combineReducers } from "redux";
import settings from "./settings/Reducer";
import headerSettings from "./headerSettings/Reducer"

const Reducers = combineReducers({
  settings,
  headerSettings,
});

export default Reducers;
