App = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){ //assigns variables, objects (stuff) to this.props.data.property - (loggedIn)

    const subHandles = [
      Meteor.subscribe('requests'),
      Meteor.subscribe('currentNinja', Meteor.userId())
    ];

    const subsReady = _.all(subHandles, function (handle) {
      return handle.ready();
    });

    return {
      subsReady: subsReady,
      loggedIn: !!Meteor.user(),
      requests: Requests.find().fetch(),
      currentNinja: Ninjas.findOne({userId: Meteor.userId()})
    }
  },

  componentDidMount() {
    var count = 0;
    Tracker.autorun(function () {
      count++;
      var requests = Requests.find().count();
      if (count > 2 && Meteor.user()) {
        sAlert.success('New request. <a href="/">Go to Dashboard</a>', {html: true, effect: 'genie'});
      }
    });
  },

  allowedLayout(){
    var allowedLayouts = ['Request', 'Login', 'Register'];
    var layoutAllowed = false;
    if ($.inArray(this.props.content.props.name, allowedLayouts) > -1 || this.data.loggedIn) {
      layoutAllowed = true;
    }
    return layoutAllowed;
  },

  showRequests(){
    var numRequests = this.data.requests.length;
    var count = 0;
    var foundRequest = false;
    if (this.data.requests.length) {
      return this.data.requests.map((request) => {
        count++;
        if (request.assignedNinja == this.data.currentNinja._id) {
          return (
            <div>
              <h1 className="request" id={request._id} key={request._id}>{request.target}</h1>
              <button onClick={this.completeRequest} className="btn btn-primary">
                Target Eliminated
              </button>
            </div>
          )
          foundRequest = true;
        }
        else {
          if (count == numRequests && !foundRequest) {
            return (
              <h1> You do not have any assigned targets.</h1>
            )
          }
        }
      });
    } else {
      return (
        <h1>You do not have any assigned targets.</h1>
      )
    }
  },

  completeRequest(e) {
    e.preventDefault();
    var ninja = this.data.currentNinja._id;
    var request = {};
    request._id = $('h1.request').attr('id');
    request.ninja - ninja;
    Meteor.call('completedRequest', request);
  },

  showLayout(){
    console.log('showLayout invoked');
    if (this.data.subsReady) {
      console.log('if this.data.subsReady pass');
      if (this.props.content.props.name == 'Request') {
        return (
          <div className="col-xs-12 col-sm-6 col-sm-offset-3 text-center">
            {this.props.content}
          </div>
        )
      } else if (Roles.userIsInRole(Meteor.userId(), 'ninjas')) {
        if (this.data.requests) {
          return (
            <div className="col-xs-12 col-sm-6 col-sm-offset-3 text-center">
              {this.showRequests()}
            </div>
          )
        }
      } else {
        return (
          <div className="row">
            <div className="col-xs-3">
              {this.props.nav}
            </div>
            <div className="col-xs-9">
              {this.props.content}
            </div>
          </div>
        )
      }
    } else {
      <div>
        <h1>Loading...</h1>
      </div>
    }
  },

  showLogin()
  {
    return (
      <div className="row">
        <div className="col-xs-12 text-center">
          <p>You must be logged in to do that.</p>
        </div>
        <div className="row">
          <div className="col-xs-12 col-xs-offset-3">
            <Login />
          </div>
        </div>
      </div>
    )
  }
  ,

  render()
  {
    return (
      <div className="container-fluid main-container">
        <div className="row">
          {this.allowedLayout() ? this.showLayout() : this.showLogin()}
        </div>
      </div>
    )
  }


});