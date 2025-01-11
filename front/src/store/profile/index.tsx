import { createStore, combineReducers } from "redux";
import { RootState } from "../../class/RootState";
import profileReducer from "./reducer";

const store = createStore(
  combineReducers<RootState>({
    profile: profileReducer
  }),
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
