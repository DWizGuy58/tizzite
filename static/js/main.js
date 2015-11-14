 // var myDataRef = new Firebase('https://tizzite.firebaseio.com');
 //  	$('#messageInput').keypress(function (e) {
 //        if (e.keyCode == 13) {
 //          var name = $('#nameInput').val();
 //          var text = $('#messageInput').val();
 //          myDataRef.push({name: name, text: text});
 //          $('#messageInput').val('');
 //        }
 //    });
 //    myDataRef.on('child_added', function(snapshot) {
	// 		var message = snapshot.val();
	// 	displayChatMessage(message.name, message.text);
	// });
	// 


// Create a function to kick off our BackboneFire app
function init() {
  // The data we are syncing from our remote Firebase database
  var collection = new TodoCollection();
  var app = new AppView({ collection: collection });
}

// When the document is ready, call the init function
$(function() {
  init();
});