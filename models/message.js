var Message = Backbone.Model.extend({
	defaults: {
		sent: Firebase.ServerValue.TIMESTAMP
	}
});

var MessagesCollection = Backbone.Firebase.Collection.extend({
	model: Message,
	url: function() {
		// return new Firebase("https://tizzite.firebaseio.com/events/" + this.eventId + "/messages");
		return new Firebase("https://tizzite.firebaseio.com/" + this.eventId + "/messages");
	},

	initialize: function(options) {
		this.eventId = options.event_id
	}
});