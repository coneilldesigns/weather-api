// Base Components
import React, { Component } from "react";
import LocationDetection from "../LocationDetection/";
import errorImage from "./error.jpg";

import { connect } from "react-redux";
import { fetchAllRequiredData } from "../../actions";

import { backgroundFixer } from "../Helpers";

//SCSS
import "./App.scss";

class App extends Component {
  componentDidMount() {}

  render() {
    // Choose Background if failed or success
    var bg = backgroundFixer(
      this.props.fullRequestStatus.geolocationStatus,
      this.props.fullWeatherData.backgroundInfo,
      errorImage
    );

    return (
      <div className="root-inside">
        <div className="container h-100">
          <div className="row h-100">
            <div className="col-12 my-auto">
              <div className="component-holder">
                <LocationDetection />
              </div>
            </div>
          </div>
        </div>
        <div
          className="background-image"
          style={{
            backgroundImage: `url(${bg})`
          }}
        />
        <div className="overlay" />
      </div>
    );
  }
}

const mapGlobalStorageStateToComponentProps = state => {
  const fullWeatherData = {
    latlang: state.geoLocationReducer.data,
    locationInfo: state.currentWeatherReducer.data,
    timezoneInfo: state.timezoneReducer.data,
    backgroundInfo: state.unsplashBackgroundReducer.data
  };

  const fullRequestStatus = {
    weatherStatus: state.currentWeatherReducer.isFetching,
    geolocationStatus: state.geoLocationReducer.isFetching,
    timezoneStatus: state.timezoneReducer.isFetching,
    unsplashBackground: state.unsplashBackgroundReducer.isFetching,
    errorMessage: state.geoLocationReducer.errorMessage
  };

  return {
    loadingObject: state.loadingReducer,
    fullRequestStatus: fullRequestStatus,
    fullWeatherData: fullWeatherData
  };
};

export default connect(
  mapGlobalStorageStateToComponentProps,
  { fetchAllRequiredData }
)(App);
