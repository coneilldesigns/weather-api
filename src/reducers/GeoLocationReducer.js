// Reducer has 2 agruments, whats in storage, = [] is to make sure first time this is loaded it has something in it, and the action viewer
const initialState = [];

export default (currentGeoDataInStorage = initialState, action) => {
  switch (action.type) {
    case "GET_GEOLOCATION_REQUEST":
      return { ...currentGeoDataInStorage, isFetching: "fetching" };
    case "GET_GEOLOCATION_SUCCESS":
      return {
        ...currentGeoDataInStorage,
        isFetching: "success",
        data: action.payload
      };
    case "GET_GEOLOCATION_FAILURE":
      return {
        ...currentGeoDataInStorage,
        isFetching: "failed",
        errorMessage: action.payload
      };
    default:
      return currentGeoDataInStorage;
  }
};
