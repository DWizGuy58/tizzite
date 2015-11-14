// A simple todo model
var Todo = Backbone.Model.extend({
  defaults: { title: "New Todo" }
});
// Create a Firebase.Collection and set the 'firebase' property
// to the URL of our database
var TodoCollection = Backbone.Firebase.Collection.extend({
  model: Todo,
  url: "https://tizzite.firebaseio.com"
});