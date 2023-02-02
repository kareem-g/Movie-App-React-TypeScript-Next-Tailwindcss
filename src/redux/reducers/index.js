import { combineReducers } from "redux";
import { myList, myListIds } from "./myList";
import modalOpen from "./modal";

const appReducer = combineReducers({
  myList,
  myListIds,
  modalOpen,
});

export default withReduxStateSync(appReducer);
