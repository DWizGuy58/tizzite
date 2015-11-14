EventCollection = Backbone.Firebase.Collection.extend({
	model: Event,
	url: "https://tizzite.firebaseio.com/events"
});