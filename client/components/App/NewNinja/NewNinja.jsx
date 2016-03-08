NewNinja = React.createClass({

  addNinja (e) {
    e.preventDefault();
    var firstName = $('#firstName').val();
    var lastName = $('#lastName').val();

    var ninja = {firstName: firstName, lastName: lastName};
    Meteor.call('addNinja', ninja);
    $('#firstName').val('');
    $('#lastName').val('');

  },

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <h1>Add Ninja</h1>
            <form id="new-ninja-form" action="#" onSubmit={this.addNinja}>
              <div className="form-group">
                <label htmlFor="firstName">First Name:</label>
                <input type="text" id="firstName" name="firstName" className="form-control"/>
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name:</label>
                <input type="text" id="lastName" name="lastName" className="form-control"/>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary">Add Ninja</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

});

