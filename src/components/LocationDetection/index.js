// Base Components
import React, { Component } from "react";
import WeatherDisplayCard from "../WeatherDisplayCard/";
import RefreshAll from "../RefreshAll/";

import { connect } from "react-redux";
import { getGeoLocation } from "../../actions";

//import { createLoadingSelector } from "../../apis/Selectors";

class LocationDetection extends Component {
  componentDidMount() {}

  detectLocation = () => {
    //console.log("Geo location Button Clicked");
    this.props.getGeoLocation();
  };

  render() {
    //If geo request is happening
    if (this.props.loadingObject.GET_GEOLOCATION === true) {
      return (
        <div className="row text-center text-light">
          <div className="col-12">
            <div className="spinner-holder">
              <div className="spinner-grow" role="status" />
            </div>
            <p className="ready-message">Getting Location...</p>
          </div>
        </div>
      );
      //If timezone request is happening
    } else if (this.props.loadingObject.GET_TIMEZONE === true) {
      return (
        <div className="row text-center text-light">
          <div className="col-12">
            <div className="spinner-holder">
              <div className="spinner-grow" role="status" />
            </div>
            <p className="ready-message">Getting Timezone...</p>
          </div>
        </div>
      );
      //If get weather is happening
    } else if (this.props.loadingObject.GET_WEATHER === true) {
      return (
        <div className="row text-center text-light">
          <div className="col-12">
            <div className="spinner-holder">
              <div className="spinner-grow" role="status" />
            </div>
            <p className="ready-message">Getting Weather Data...</p>
          </div>
        </div>
      );
      //If background request happening
    } else if (this.props.loadingObject.GET_BACKGROUND === true) {
      return (
        <div className="row text-center text-light">
          <div className="col-12">
            <div className="spinner-holder">
              <div className="spinner-grow" role="status" />
            </div>
            <p className="ready-message">Getting a nice background...</p>
          </div>
        </div>
      );
      // If All Succuess
    } else if (
      this.props.fullRequestStatus.geolocationStatus === "success" &&
      this.props.fullRequestStatus.timezoneStatus === "success" &&
      this.props.fullRequestStatus.unsplashBackground === "success" &&
      this.props.fullRequestStatus.weatherStatus === "success"
    ) {
      return (
        <div className="row text-light">
          <div className="col-12">
            <WeatherDisplayCard
              lat={this.props.fullWeatherData.latlang.lat}
              long={this.props.fullWeatherData.latlang.long}
              city={
                this.props.fullWeatherData.locationInfo.city._attributes.name
              }
              countryCode={
                this.props.fullWeatherData.timezoneInfo.countryName._text
              }
              tempMin={
                this.props.fullWeatherData.locationInfo.temperature._attributes
                  .min
              }
              tempMax={
                this.props.fullWeatherData.locationInfo.temperature._attributes
                  .max
              }
              tempUnits={
                this.props.fullWeatherData.locationInfo.temperature._attributes
                  .unit
              }
              tempValue={
                this.props.fullWeatherData.locationInfo.temperature._attributes
                  .value
              }
              weatherIcon={
                this.props.fullWeatherData.locationInfo.weather._attributes.icon
              }
              weatherType={
                this.props.fullWeatherData.locationInfo.weather._attributes
                  .value
              }
              lastUpdateTime={
                this.props.fullWeatherData.locationInfo.lastupdate._attributes
                  .value
              }
              iconUrl={
                this.props.fullWeatherData.locationInfo.weather._attributes.icon
              }
              lastUpdate={
                this.props.fullWeatherData.locationInfo.lastupdate._attributes
                  .value
              }
            />
            <p className="ready-message">
              Geo-Location, Timezone, Weather and Background Data Found &
              Stored!
            </p>
          </div>
        </div>
      );
    } else if (
      this.props.fullRequestStatus.geolocationStatus === "failed" ||
      this.props.fullRequestStatus.timezoneStatus === "failed" ||
      this.props.fullRequestStatus.unsplashBackground === "failed" ||
      this.props.fullRequestStatus.weatherStatus === "failed"
    ) {
      // console.log(
      //   "Props from within Location Detection component: ",
      //   this.props.fullRequestStatus.errorMessage.error
      // );
      return (
        <div className="card">
          <div className="card-body card-error">
            <div className="row">
              <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12 text-center">
                <i className="fa fa-exclamation-triangle" />
              </div>
              <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 text-left">
                <h1 className="text-left failed-header">REQUEST FAILED</h1>
                <h6>
                  Error: {this.props.fullRequestStatus.errorMessage.error}
                </h6>
              </div>
            </div>
          </div>
          <div className="card-footer text-muted">
            <div className="refresh">
              <RefreshAll />
            </div>
            <div className="lat-lon">Lat: N/A / Long: N/A</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="row text-center text-light">
          <div className="col-12">
            <p className="ready-message">
              <i className="fa fa-map-marker" />
              <br />
              This application needs access to your location.
            </p>
            <div
              className="btn btn-secondary btn-xs"
              onClick={this.detectLocation}
            >
              <i className="fa fa-crosshairs" aria-hidden="true" /> Detect my
              location
            </div>
          </div>
        </div>
      );
    }
  }
}

//const loadingSelector = createLoadingSelector([
//  "GET_GEOLOCATION",
//  "GET_TIMEZONE",
//  "GET_WEATHER",
//  "GET_BACKGROUND"
//]);

const mapGlobalStorageStateToComponentProps = state => {
  // console.log(
  //   "State of Redux within Location Detection component: ",
  //   state.geoLocationReducer.errorMessage
  // );

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
  { getGeoLocation }
)(LocationDetection);
