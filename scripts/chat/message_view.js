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
		var ref = new Firebase('tizzite.firebaseio.com')

		console.log(ref);
		facebookAuth = ref.getAuth();
		console.log(facebookAuth);

		this.userName = facebookAuth.facebook.displayName;
		this.userId = facebookAuth.facebook.id;

		this.list = $("#message-list");
		this.input = $("#new-message");

		$("#send-message").click(function(e) {
			that.sendMessage(that);
		});

		this.listenTo(this.collection, 'add', this.appendMessage);
	},

	appendMessage: function(message) {
		var view = new MessageView({model: message});
		this.list.append(view.render().el);
	},

	sendMessage: function(view) {
		if (!view.input.val()) {
			return;
		}

		view.collection.create({
			userId: view.userId,
			userName: view.userName,
			text: view.input.val()
		});

		view.input.val('');
	}
});