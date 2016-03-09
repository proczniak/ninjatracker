App = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){ //assigns variables, objects (stuff) to this.props.data.property - (loggedIn)
    return{
      loggedIn: !!Meteor.user()
    }
  },

  allowedLayout(){
    var allowedLayouts = ['Request', 'Login', 'Register'];
    var layoutAllowed = false;
    if ($.inArray(this.props.content.props.name, allowedLayouts) > -1 || this.data.loggedIn) {
      layoutAllowed = true;
    }
    return layoutAllowed;
  },

  showLayout(){
    if (this.props.content.props.name == 'Request') {
      return (
        <div className="col-xs-12 col-sm-6 col-sm-offset-3 text-center">
          {this.props.content}
        </div>
      )
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
  },
  showLogin() {
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
  },

  render() {
    return(
      <div className="container-fluid main-container">
        <div className="row">
            {this.allowedLayout() ? this.showLayout() : this.showLogin()}
        </div>
      </div>
    )
  },

  componentDidMount() {
    var count = 0;
    Tracker.autorun(function(){
      count++;
      var requests = Requests.find().count();
      if (count > 2 && Meteor.user()) {
        sAlert.success('New request. <a href="/">Go to Dashboard</a>', {html: true, effect: 'genie'});
      }
    });
  }
});