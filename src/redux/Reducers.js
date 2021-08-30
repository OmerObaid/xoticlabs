import { combineReducers } from "redux";
import settings from "./settings/Reducer";
import headerSettings from "./headerSettings/Reducer"
// import chatReducer from "./chats/Reducer";
// import notesReducer from "./notes/Reducer";
// import contactReducer from "./contacts/";
// import emailReducer from "./email/";
// import maintodoReducer from "./todos/Todos";
// import todoReducer from "./todos/";

const Reducers = combineReducers({
  settings,
  headerSettings,
});

export default Reducers;
