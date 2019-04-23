// Reducer has 2 agruments, whats in storage, = [] is to make sure first time this is loaded it has something in it, and the action viewer
export default (currentTimezoneInStorage = [], action) => {
  switch (action.type) {
    case "GET_TIMEZONE_REQUEST":
      return { ...currentTimezoneInStorage, isFetching: "fetching" };
    case "GET_TIMEZONE_SUCCESS":
      return {
        ...currentTimezoneInStorage,
        isFetching: "success",
        data: action.payload
      };
    case "GET_TIMEZONE_FAILURE":
      return {
        ...currentTimezoneInStorage,
        isFetching: "failed",
        errorMessage: action.payload
      };
    default:
      return currentTimezoneInStorage;
  }
};
