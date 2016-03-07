App = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){ //assigns variables, objects (stuff) to this.props.data.property - (loggedIn)
    return{
      loggedIn: !!Meteor.user()
    }
  },
  showLayout(){
    return(
        <div className="row">
            <div className="col-xs-3">
                {this.props.nav}
            </div>
            <div className="col-xs-9">
                {this.props.content}
            </div>
        </div>
    )
  },
  showLogin() {
      return (
          <div className="row">
              <div className="col-xs-12 text-center">
                  <p>You must be logged in to do that.</p>
              </div>
          </div>
      )
  },
  render() {
    return(
      <div className="container-fluid main-container">
        <div className="row">
            {this.data.loggedIn ? this.showLayout() : this.showLogin()}
        </div>
      </div>
    )
  }
});