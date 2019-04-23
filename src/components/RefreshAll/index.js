import React from "react";

class RefreshAll extends React.Component {
  onRefreshClick = event => {
    window.location.reload();
  };

  render() {
    return (
      <div>
        <button onClick={this.onRefreshClick}>
          <i className="fa fa-refresh" aria-hidden="true" /> Refresh All
        </button>
      </div>
    );
  }
}

export default RefreshAll;
