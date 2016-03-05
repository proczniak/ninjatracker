App = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){ //assigns variables, objects (stuff) to this.props.data.loggedIn
    return{
      loggedIn: !!Meteor.user()
    }
  },
  render() {
    return(
      <div className="container-fluid main-container">
        <div className="col-xs-3">
          {this.props.nav}
        </div>
        <div className="col-xs-9">
          {this.props.content}
        </div>
      </div>
    )
  }
});