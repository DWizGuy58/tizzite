EventView = Backbone.View.extend({
	el: $('#event-popover'),
	events: {

	},

	initialize: function(options) {
		this.model = options.model;
		this.listenTo(this.model, "change", this.render());
	},

	render: function() {
		// this.$('#event-popover').html = this.eventName;
		$('#event-name').append(this.model.get('name'));

		return this;
	}
});