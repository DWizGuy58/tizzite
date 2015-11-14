$('#sign-up-button').click(function(){
  
  console.log($('#signup-name').val())
  console.log($('#signup-password').val())
  var ref = new Firebase("https://tizzite.firebaseio.com/");
  ref.createUser({
    email    : $('#signup-name').val(),
    password : $('#signup-password').val()
  }, function(error, userData) {
    if (error) {
      alert('Sorry sign up failed')
      console.log("Error creating user:", error);
    } else {
      alert('Success!')
      console.log("Successfully created user account with uid:", userData.uid);
    }
  });
})

$('#sign-in-button').click(function(){
  console.log($('#signin-name').val())
  console.log($('#signin-password').val())
})