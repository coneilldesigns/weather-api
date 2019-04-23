// This file is combinding the reducers in this directory

// Any action that is initiated has to pass through here
// the type: { 'WHATEVER_ACTION' } is caught by each reducer and the global storage
// is updated.

//tool to combine
import { combineReducers } from "redux";

// File imports from directory
import geoLocationReducer from "./GeoLocationReducer";
import loadingReducer from "./LoadingReducer";
import timezoneReducer from "./TimezoneReducer";
import currentWeatherReducer from "./CurrentWeatherReducer";
import unsplashBackgroundReducer from "./UnsplashBackgroundReducer";

// Making the global storage
export default combineReducers({
  geoLocationReducer: geoLocationReducer,
  loadingReducer: loadingReducer,
  timezoneReducer: timezoneReducer,
  currentWeatherReducer: currentWeatherReducer,
  unsplashBackgroundReducer: unsplashBackgroundReducer
});
