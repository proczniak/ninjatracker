Request = React.createClass({


  render() {
    return (
      <div className="col-xs-3">
        <div className="request panel panel-default">
          <h2>{this.props.request.clientName}</h2>
          <h2>{this.props.request.target}</h2>
        </div>
      </div>
    )
  }
});

