$( document ).ready(function() {

  var ref = new Firebase("https://tizzite.firebaseio.com");

  // Register the callback to be fired every time auth state changes
  ref.onAuth(authDataCallback);

  // Everytime page loads, check if user is logged in
  checkLogInStatus(ref);

  $('#fblogout-button').click(function(){
    var isLoggedIn = ref.getAuth();
    if(isLoggedIn) {
      console.log("User " + isLoggedIn.uid + " is logged in with " + isLoggedIn.provider);
      ref.unauth();
      $('#fblogin-button').show();
      $('#fblogout-button').hide();
      window.location.reload(true);
      alert('Log out successful!');
    } else {
      console.log("Error: already logged out");
      alert("Error: already logged out");
      // should never get here because logout button shouldn't show
    }  
  })

  $('#fblogin-button').click(function(){
    var isLoggedIn = ref.getAuth();
    if(!isLoggedIn) {
      ref.authWithOAuthRedirect("facebook", function(error) {
        if (error) {
          alert("Login Failed!", error);
        } else {
          // We'll never get here, as the page will redirect on success.
        }
      })
    } else {
      console.log("Error: already logged in");
      alert('Error: already logged in.');
      // should never get here because login button shouldn't show up
    }
  })
});

// Create a callback which logs the current auth state
function authDataCallback(authData) {
  if (authData) {
    console.log('From authDataCallback')
    console.log("User " + authData.uid + " is logged in with " + authData.provider);
    $('#fblogin-button').hide()
    $('#fblogout-button').show()
  } else {
    console.log("User is logged out");
    $('#fblogin-button').show()
    $('#fblogout-button').hide()
  }
}

// check user's login status and show appropriate login button accordingly
function checkLogInStatus(ref) {
  var isLoggedIn = ref.getAuth();
  if (isLoggedIn) {
    $('#fblogin-button').hide();
    $('#fblogout-button').show();
  } else {
    $('#fblogin-button').show();
    $('#fblogout-button').hide();
  }
}
