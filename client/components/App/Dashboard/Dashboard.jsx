Dashboard = React.createClass({

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-12 col-sm-6">
            <Available />
          </div>
          <div className="col-xs-12 col-sm-6">
            <Busy />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <RequestsComponent />
          </div>
        </div>
      </div>
    )
  }
});