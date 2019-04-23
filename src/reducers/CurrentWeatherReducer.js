// Reducer has 2 agruments, whats in storage, = [] is to make sure first time this is loaded it has something in it, and the action viewer
const initialState = [];

export default (currentWeatherDataInStorage = initialState, action) => {
  switch (action.type) {
    case "GET_WEATHER_REQUEST":
      return { ...currentWeatherDataInStorage, isFetching: "fetching" };
    case "GET_WEATHER_SUCCESS":
      return {
        ...currentWeatherDataInStorage,
        isFetching: "success",
        data: action.payload
      };
    case "GET_WEATHER_FAILURE":
      return {
        ...currentWeatherDataInStorage,
        isFetching: "failed",
        errorMessage: action.payload
      };
    default:
      return currentWeatherDataInStorage;
  }
};
