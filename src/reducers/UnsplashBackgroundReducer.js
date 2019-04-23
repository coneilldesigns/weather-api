// Reducer has 2 agruments, whats in storage, = [] is to make sure first time this is loaded it has something in it, and the action viewer
const initialState = [];

export default (currentBackgroundDataInStorage = initialState, action) => {
  switch (action.type) {
    case "GET_BACKGROUND_REQUEST":
      return { ...currentBackgroundDataInStorage, isFetching: "fetching" };
    case "GET_BACKGROUND_SUCCESS":
      return {
        ...currentBackgroundDataInStorage,
        isFetching: "success",
        data: action.payload
      };
    case "GET_BACKGROUND_FAILURE":
      return {
        ...currentBackgroundDataInStorage,
        isFetching: "failed",
        errorMessage: action.payload
      };
    default:
      return currentBackgroundDataInStorage;
  }
};
