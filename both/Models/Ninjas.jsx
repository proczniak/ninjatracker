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
  },
  userId: {
    type: String
  }
});

Ninjas.attachSchema(Schemas.Ninja);

Ninjas.helpers({
  fullName: function () {
    return this.firstName + ' ' + this.lastName;
  }
});

Ninjas.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();

Meteor.methods({
  addNinja(ninja) {
    if (!Meteor.userId()) {
      return
    }

    var ninja = {}
    ninja.firstName = user.firstName;
    ninja.lastName = user.lastName;
    ninja.score = 0;
    ninja.status = true;
    ninja.jobsCompleted = 0;
    ninja.userId = Meteor.userId();
    check(ninja, Ninjas.simpleSchema());

    Ninjas.insert({
      firstName: ninja.firstName,
      lastName: ninja.lastName,
      score: ninja.score,
      status: ninja.status,
      jobsCompleted: ninja.jobsCompleted,
      userId: ninja.user.Id
    });
  },
  editNinja(ninja) {
    if (!Meteor.userId()) {
      return
    }

    Ninjas.update(ninja._id, {
      $set: {firstName: ninja.firstName, lastName: ninja.lastName}
    });
  },
  addNinjaFromForm(ninja){
    if (Meteor.isServer) {
      var newUser = Accounts.createUser({email: ninja.email, password: 'password'});
      Ninjas.insert({
        firstName: ninja.firstName,
        lastName: ninja.astName,
        score: 0,
        satus: true,
        jobsCompleted: 0,
        userId: newUser
      });
    }
    Meteor.call('addRole', newUser);
  }
});




if (Meteor.isServer) {
  Meteor.publish('ninjas', function () {
    return Ninjas.find();
  });

  Meteor.publish('ninja', function (id) {
    return Ninjas.find({_id: id});
  });

  //Meteor.publish('currentNinja', function(user) {
  //  return Ninjas.find({userId: user});
  //});
}