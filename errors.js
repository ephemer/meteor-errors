Errors = {
	// Local (client-only) collection
	collection: new Meteor.Collection(null),

	addHook: function (cursor, ns, messageKey) {
		// 1. Add a cursor to watch for changes, e.g.: Collection.Find({}, { fields: { "profile.paymentErrors": 1 } })
		// 2. Add objects appearing in cursor to the given namespace's error collection
		// 3. Choose which key's values should be used for the message (optional)
		// 4. Remove errors from original collection when removed from here

		messageKey = messageKey || "message"; // Set default. Could be something like "profile.paymentErrors.msg"

		if(cursor.count() === 1){ // this logic is faulty. maybe there is currently 0 and there should be 1 max.
			cursor.observe({
				changed: function (newDocument, oldDocument) {
					console.log("document changed", newDocument, oldDocument);
				}
			});
		} else {
			cursor.observe({
				added: function (document) {
					console.log("error added", document);
				},
				removed: function (document) {
					console.log("error removed", document);
				}
			});
		}
		
	},

	throw: function(message, ns, when) {
		Errors.collection.insert({
			message: message,
			ns: ns,
			seen: false,
			when: when || new Date()
		});
	},

	clearSeen: function() {
		Errors.collection.remove({seen: true});
	}
};
