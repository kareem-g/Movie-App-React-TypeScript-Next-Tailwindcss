import { applyMiddleware, createStore } from "redux";

import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "@redux-devtools/extension";
import rootReducer from "./reducers/index";
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export let Store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
export let Persistor = persistStore(Store);
