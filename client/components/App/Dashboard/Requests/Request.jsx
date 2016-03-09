Request = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        Meteor.subscribe('ninjas');
        return {
            ninjas: Ninjas.find({status: true}).fetch()
        }
    },
    ninjaSelect() {
        return this.data.ninjas.map((ninja) => {
            return <option key={ninja._id}>{ninja.fullName()}</option>
        });
    },
    showAssignNinja(e) {
        e.preventDefault();
        $(e.target).hide();
        $(e.target).next().show;
    },
    assignNinja(e) {
        e.preventDefault();
        var ninja = $('#ninjas option:selected').val();
        var request = this.props.request._id;
        Meteor.call('assignNinja', ninja);
        Meteor.call('updateRequest', request);
    },

    render() {
        return (
            <div className="col-xs-3">
                <div className="request panel panel-default">
                    <a href="#" className="assign-ninja btn btn-primary" id="showAssignNinja"
                       onClick={this.showAssignNinja}>
                        Assign Ninja
                    </a>
                    <div className="select-ninja">
                        <select name="ninjas" id="ninjas">
                            <option value="0">Choose a ninja...</option>
                            {this.ninjaSelect()}
                        </select>
                        <a href="#" className="btn btn-primary" id="assignNinja"
                           onClick={this.assignNinja}>
                            Assign
                        </a>
                    </div>
                    <h2>{this.props.request.clientName}</h2>
                    <h2>{this.props.request.target}</h2>
                </div>
            </div>
        )
    }
});

