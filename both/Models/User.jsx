Meteor.methods({
  addRole(userId) {
    if (Meteor.users.find().count() === 1) {
      Roles.addUserToRoles(userId,'leader');
    } else {
      Roles.addUserToRoles(userId,'ninja');
    }
  }
});