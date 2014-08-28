Template.flowErrors.helpers({
  errors: function() {
  	var ns = this.ns;
    return Errors.collection.find({ns: ns}, {sort: {when: -1}, limit: 1});
  }
});

Template.flowError.events({
	'click .close': function () {
		Errors.collection.remove(this._id);
	}
});

Template.flowError.rendered = function() {

  this.$(".alert").hide().fadeIn();
  
  var error = this.data;
  Meteor.defer(function() {
    Errors.collection.update(error._id, {$set: {seen: true}});
  });
  
};
