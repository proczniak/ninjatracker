Ninjas = new Mongo.Collection('ninjas');

var Schemas = {};
Schemas.Ninja = new SimpleSchema({
  firstName: {
    type: String,
    label: "First Name",
    max: 25
  },
  lastName: {
    type: String,
    label: "Last Name",
    max: 25,
    index: true,
    unique: true
  },
  score: {
    type: Number,
    label: "Score",
    min: 0
  },
  status: {
    type: Boolean,
    label: "Status"
  },
  jobsCompleted: {
    type: Number,
    label: "Jobs Completed",
    min: 0
  }
});

Ninjas.attachSchema(Schemas.Ninja);

Ninjas.helpers({
  fullName: function() {
    return this.firstName + ' ' + this.lastName;
  }
});

Ninjas.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();

Meteor.methods({
  addNinja(ninja) {
    if (! Meteor.userId()) {
      return
    }

    Ninjas.insert({
      firstName: ninja.firstName,
      lastName: ninja.lastName,
      score: 0,
      status: true,
      jobsCompleted: 0
    });
  },
  editNinja(ninja) {
    if(! Meteor.userId()){
      return
    }

    Ninjas.update(ninja._id, {
      $set: {firstName: ninja.firstName, lastName: ninja.lastName}
    });
  }
});

if (Meteor.isServer) {
  Meteor.publish('ninjas', function(){
    return Ninjas.find();
  });

  Meteor.publish('ninja', function(id){
    return Ninjas.find({_id: id});
  });
}