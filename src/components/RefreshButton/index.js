import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { refreshAllRequiredData } from "../../actions";

class RefreshButton extends React.Component {
  constructor(props) {
    super(props);

    this.buttonClick = this.buttonClick.bind(this);
  }

  buttonClick(event) {
    event.preventDefault();
    this.props.refreshAllRequiredData();
  }

  render() {
    return (
      <div>
        <button onClick={this.buttonClick}>
          <i className="fa fa-refresh" aria-hidden="true" /> Refresh Weather
        </button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ refreshAllRequiredData }, dispatch);
}

const mapGlobalStorageStateToComponentProps = state => {
  //console.log("State from within component", state);

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
    unsplashBackground: state.unsplashBackgroundReducer.isFetching
  };

  return {
    loadingObject: state.loadingReducer,
    fullRequestStatus: fullRequestStatus,
    fullWeatherData: fullWeatherData
  };
};

export default connect(
  mapGlobalStorageStateToComponentProps,
  { refreshAllRequiredData, mapDispatchToProps }
)(RefreshButton);
