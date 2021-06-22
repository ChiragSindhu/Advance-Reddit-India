/*Google Login Button*/
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  sessionStorage.setItem("ProfilePic", profile.getImageUrl());
  document.getElementById("field").value = profile.getEmail();
  document.getElementById("check_icon1").style.display = "block";
  document.getElementById("name_field").value = profile.getName();
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    })
};

/*FACEBOOK WILL NOT WORK*/
  function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
    console.log(response);                   // The current login status of the person.
      if (response.status === 'connected') {   // Logged into your webpage and Facebook.
          testAPI();
      } else {
          console.log("User not connected on Facebook!");
      }                               // Not logged into your webpage or we are unable to tell.
  }


  function checkLoginState() {               // Called when a person is finished with the Login Button.
    FB.getLoginStatus(function(response) {   // See the onlogin handler
      statusChangeCallback(response);
    });
  }


  window.fbAsyncInit = function() {
    FB.init({
      appId      : '857259751526362',
      cookie     : true,                     // Enable cookies to allow the server to access the session.
      xfbml      : true,                     // Parse social plugins on this webpage.
      version    : 'v10.0'           // Use this Graph API version for this call.
    });


    FB.getLoginStatus(function(response) {   // Called after the JS SDK has been initialized.
      statusChangeCallback(response);        // Returns the login status.
    });
  };
 
  function testAPI() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log(response);
    });
  }