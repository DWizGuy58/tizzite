var EventPopup = Backbone.View.extend({
	el: "#modal-region",

	initialize: function(options) {
		//Need to get information
		this.render();
	},

	render: function() {
		var template = _.template( $("#popup_template").html(), {} );
		this.$el.html(template);
		return this;
	}
})