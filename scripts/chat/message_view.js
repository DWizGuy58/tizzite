var MessageView = Backbone.View.extend({
	tagName: "li",
	template: _.template("<%= userName + ': ' + text %>"),

	initialize: function() {
		this.listenTo(this.model, "change", this.render);
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});

var MessageAppView = Backbone.View.extend({
	el: $('#messageapp'),

	initialize: function(options) {
		var that = this;

		this.list = $("#message-list");
		this.input = $("#new-message");

		$("#send-message").click(function(e) {
			console.log('click');
			that.sendMessage(that.collection);
		});

		this.listenTo(this.collection, 'add', this.appendMessage);
	},

	appendMessage: function(message) {
		console.log('appending message: ' + message.get('text'));
		var view = new MessageView({model: message});
		this.list.append(view.render().el);
	},

	sendMessage: function(collection) {
		if (!$("#new-message").val()) { 
			console.log('empty');
			return;
		}

		collection.create({
			userId: 'placeholderId',
			userName: 'placeholderName',
			text: $("#new-message").val()
		});

		$("#new-message").val('');
	}
});