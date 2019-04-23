//import _ from "lodash";
import GeoNames from "../apis/GeoNames";
import OpenWeatherAPI from "../apis/OpenWeatherAPI";
import Unsplash from "../apis/Unsplash";

import { getRandomArbitrary } from "../components/Helpers";

var getPosition = function(options) {
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

// ----------------------------------------------------  ACTION #2: TAKE USERS LAT AND LONG AND GET THEIR TIMEZONE AND OTHER COUNTRY INFO
export const getTimezoneBasedOnLatLang = (lat, long) => async dispatch => {
  console.log("Now lets look up the timezone with", lat + " and " + long);

  const convert = require("xml-js");

  dispatch({ type: "GET_TIMEZONE_REQUEST" });
  const response = await GeoNames.get("", {
    params: {
      lat: lat,
      lng: long,
      username: "onei0120"
    }
  })
    .then(response => {
      console.log("Got Timezone and converted it to json: ");
      //console.log(response);
      //Convert XML response to JSON
      var jsonConvertresult = convert.xml2js(response.data, {
        compact: true,
        spaces: 4,
        ignoreDeclaration: true
      });
      console.log("XML2JSON: ", jsonConvertresult.geonames.timezone);

      dispatch({
        type: "GET_TIMEZONE_SUCCESS",
        payload: jsonConvertresult.geonames.timezone
      });
    })
    .catch(err => {
      console.log("Failed to get Timezone");
      dispatch({
        type: "GET_TIMEZONE_FAILURE",
        payload: err
      });
    });

  //const convert = require("xml-js");
};

//---------------------------------------------------- ACTION #3: GET WEATHER DATA BASED ON LAT AND LONG
export const getWeatherBasedOnLatAndLang = (lat, long) => async dispatch => {
  const convert = require("xml-js");

  console.log("Arrived at the Weather lookup");

  dispatch({ type: "GET_WEATHER_REQUEST" });
  const response = await OpenWeatherAPI.get("", {
    params: {
      units: "metric",
      appId: "b85e12a33f771257b9decfd9f1d262da",
      mode: "xml",
      lat: lat,
      lon: long
    }
  })
    .then(response => {
      console.log("We got the weather response!");

      // handle success
      var jsonConvertresult = convert.xml2js(response.data, {
        compact: true,
        spaces: 4,
        ignoreDeclaration: true
      });
      console.log(jsonConvertresult.current);

      dispatch({
        type: "GET_WEATHER_SUCCESS",
        payload: jsonConvertresult.current
      });
    })
    .catch(err => {
      console.log(err);
      console.log("Failed to get the weather");
      dispatch({
        type: "GET_WEATHER_FAILURE",
        payload: err
      });
    });
};

//---------------------------------------------------- ACTION #4: GET BACKGROUND IMAGE BASED ON CITY AND COUNTRY
export const getBackgroundImageBasedonCityAndCountry = (
  city,
  country
) => async dispatch => {
  dispatch({ type: "GET_BACKGROUND_REQUEST" });
  console.log(
    "Im going to get the background based off these terms: ",
    city + " " + country
  );
  const response = await Unsplash.get("/search/photos", {
    params: {
      query: city + " " + country,
      per_page: "30"
    }
  })
    .then(response => {
      var randomNumber = getRandomArbitrary(
        0,
        response.data.results.length - 1
      );
      const backgroundImage = response.data.results[randomNumber].urls.regular;

      dispatch({
        type: "GET_BACKGROUND_SUCCESS",
        payload: backgroundImage
      });
      console.log("Got the random background url: ", backgroundImage);
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: "GET_BACKGROUND_FAILURE", payload: err });
    });
};

// ---------------------------------------------------- ACTION #1: GET USERS GEO LOCATION
export const getGeoLocation = () => async dispatch => {
  //console.log("Making the Geo Request: ");
  dispatch({ type: "GET_GEOLOCATION_REQUEST" });

  await getPosition()
    .then(position => {
      //console.log(position);
      console.log("Got the Location Data, heres the lat and long: ", position);
      var payload = {
        lat: position.coords.latitude,
        long: position.coords.longitude
      };
      console.log(position.coords.latitude + " / " + position.coords.longitude);
      dispatch(
        fetchAllRequiredData(
          position.coords.latitude,
          position.coords.longitude
        )
      );
      dispatch({ type: "GET_GEOLOCATION_SUCCESS", payload: payload });
    })
    .catch(err => {
      //console.log("couldnt get geo data");
      dispatch({
        type: "GET_GEOLOCATION_FAILURE",
        payload: {
          lat: "",
          long: "",
          error: err.message
        }
      });
    });
};

// ---------- LINK THE ACTIONS
export const fetchAllRequiredData = (lat, long) => async (
  dispatch,
  getState
) => {
  console.log("Got to function");
  //This function combines the two below so you can run one after the other

  //Use lat and long to get timezone - wait
  await dispatch(getTimezoneBasedOnLatLang(lat, long));

  //Use lat and long to get local weather data - wait
  await dispatch(getWeatherBasedOnLatAndLang(lat, long));

  // Get City and country from the above two functions
  const city = getState().currentWeatherReducer.data.city._attributes.name;
  const country = getState().timezoneReducer.data.countryName._text;

  //Use city Name and Country to query Unpslash for multiple photos
  await dispatch(getBackgroundImageBasedonCityAndCountry(city, country));

  //console.log("State after all the requests run: ", getState());

  //_.chain(getState().posts)
  //  .map("userId")
  //  .uniq()
  //  .forEach(id => dispatch(fetchUser(id)))
  //  .value();
};

export const refreshAllRequiredData = () => async (dispatch, getState) => {
  //Store lat and long
  const lat = getState().geoLocationReducer.data.lat;

  const long = getState().geoLocationReducer.data.long;

  //Use lat and long to get timezone - wait
  await dispatch(getTimezoneBasedOnLatLang(lat, long));

  //Use lat and long to get local weather data - wait
  await dispatch(getWeatherBasedOnLatAndLang(lat, long));

  // Get City and country from the above two functions
  const city = getState().currentWeatherReducer.data.city._attributes.name;
  const country = getState().timezoneReducer.data.countryName._text;

  //Use city Name and Country to query Unpslash for multiple photos
  await dispatch(getBackgroundImageBasedonCityAndCountry(city, country));
};
