$( document ).ready(function() {
	ref = new Firebase('tizzite.firebaseio.com')
	$('#chat-button').click(function() {
		console.log('I got clicked!')
		isLoggedIn = ref.getAuth()
		if (isLoggedIn) {
			window.location = '/chat.html'	
		} else {
			alert('you must be logged in to chat')
		}
		
	})
})