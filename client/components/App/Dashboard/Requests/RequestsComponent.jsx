RequestsComponent = React.createClass({
  mixins: [
    ReactMeteorData
  ],

  getMeteorData() {
    Meteor.subscribe('requests');
    return {
      requests: Requests.find({fulfilled: false}).fetch()
    }
  },

  renderRequests() {
    return this.data.requests.map((request) => {
      return <Request key={request._id} request={request} />;
    });
  },

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h1>Open Requests</h1>
        </div>
        <div className="panel-content">
          { this.renderRequests() }
        </div>
      </div>
    )
  }
});