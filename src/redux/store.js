import { createStore, combineReducers } from "redux";
import geojsonReducer from "./reducer";

const rootReducer = combineReducers({
  geojson: geojsonReducer,
});

const store = createStore(rootReducer);

export default store;
