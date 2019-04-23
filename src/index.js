import React from "react";
import ReactDOM from "react-dom";

// Import Store Provider, createStore, and applyMiddleware for Thunk
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

// Import Thunk to deal with reducers + actions
import Thunk from "redux-thunk";

//Import Whole app
import App from "./components/App/App";
import reducers from "./reducers";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";

//Pass reducers into createStore along with Thunk to create global storage
const store = createStore(reducers, applyMiddleware(Thunk));

//Wrap the app with storage provider, pass in createStore
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
