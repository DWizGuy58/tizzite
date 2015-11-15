// Create a callback which logs the current auth state
function authDataCallback(authData) {
  if (authData) {
    console.log("User " + authData.uid + " is logged in with " + authData.provider);
    $('#fblogin-button').hide()
    $('#fblogout-button').show()
  } else {
    console.log("User is logged out");
    $('#fblogin-button').show()
    $('#fblogout-button').hide()
  }
}

// Register the callback to be fired every time auth state changes
var ref = new Firebase("https://tizzite.firebaseio.com");
ref.onAuth(authDataCallback);

$('#fblogout-button').click(function(){
  var isLoggedIn = ref.getAuth();
  if(isLoggedIn) {
    console.log("User " + isLoggedIn.uid + " is logged in with " + isLoggedIn.provider);
    ref.unauth();
    $('#fblogin-button').show()
    $('#fblogout-button').hide()
  } else {
    console.log("Error: already logged out");
    // never get here because logout button shouldn't show
  }  
})

$('#fblogin-button').click(function(){
  $('#fblogin-button').hide()
  $('#fblogout-button').show()
  var isLoggedIn = ref.getAuth();
  if(isLoggedIn) {
    alert("User " + isLoggedIn.uid + " is logged in with " + isLoggedIn.provider);
  } else {
    ref.authWithOAuthRedirect("facebook", function(error) {
      if (error) {
        alert("Login Failed!", error);
      } else {
        // We'll never get here, as the page will redirect on success.
      }
    });
  }
})
