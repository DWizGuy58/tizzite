var Event = Backbone.Model.extend({
	defaults: {
		name: 'test event',
		description: '',
		owner: ''
	 }
});

var EventsCollection = Backbone.Firebase.Collection.extend({
	model: Event,
	url: "https://tizzite.firebaseio.com/events"
});