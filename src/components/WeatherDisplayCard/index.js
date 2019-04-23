import React from "react";
import Clock from "react-live-clock";
import RefreshButton from "../RefreshButton/";

import {
  toTitleCase,
  formatDate,
  tempUpdate,
  weatherIconFunc,
  fixUnitsSomething
} from "../Helpers";

const WeatherDisplayCard = props => {
  //console.log("Props from Inside Weather Card: ", props);

  // Fix Up Units
  var fixUnits = fixUnitsSomething(props.tempUnits);

  // Fix Weather Icon
  var weatherIcon = weatherIconFunc(props.iconUrl);

  // Capitalize Weather Title
  var newWeatherTitle = toTitleCase(props.weatherType);

  // Format Latest Update
  var newLatestUpdate = formatDate(props.lastUpdate);

  // Format Temperature
  var newTemp = tempUpdate(props.tempValue);

  return (
    <div className="card">
      <div className="card-body card-success">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12">
              <ul className="list-inline">
                <li>
                  <div className="img-icon">
                    <img src={weatherIcon} alt="" />
                  </div>
                </li>
                <li>
                  <p>{newWeatherTitle}</p>
                </li>
              </ul>
              <div className="maintemp">
                <h1>
                  {newTemp}°{fixUnits}
                </h1>
                <span>
                  Low: {props.tempMin} / High: {props.tempMax}
                </span>
              </div>
            </div>
            <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12 text-right">
              <div className="date">
                <h3>
                  <Clock
                    format={"h:mm:ss A"}
                    ticking={true}
                    timezone={"America/Toronto"} //Timezone will go here
                  />
                </h3>
                <p>Last Update: {newLatestUpdate}</p>
              </div>
              <p className="city">
                {props.city}, {props.countryCode}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="card-footer text-muted">
        <div className="refresh">
          <RefreshButton />
        </div>
        <div className="lat-lon">
          Lat: {props.lat} / Long: {props.long}
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplayCard;
