/*Google Login Button*/
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log(profile);
  document.getElementById("field").value = profile.getEmail();
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
/*************************************/
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById("field").value = "";
  document.getElementById("pass_field").value = "";
  document.getElementById("show_hide").style.display = "none";
  document.getElementById("load_icon").style.display = "none";
  document.getElementById("fgt").style.display = "none";
});

function pass_show_hide() {
    let pass = document.getElementById("pass_field").value;
    if (pass.length > 0) {
        document.getElementById("show_hide").style.display = "block";
    } else {
        document.getElementById("show_hide").style.display = "none";
    }
}

function show_hide_func() {
    if (document.getElementById("pass_field").type === "password") {
        document.getElementById("pass_field").type = "text";
        document.getElementById("show_hide").innerText = "Hide";
    } else {
        document.getElementById("pass_field").type = "password";
        document.getElementById("show_hide").innerText = "Show";
    }
}

function login_account() {
  //console.log(document.getElementById("login_btn").style.backgroundColor);
  if (document.getElementById("login_btn").style.backgroundColor == "rgb(64, 93, 230)") {
    if (document.getElementById("load_icon").style.display == "block") {
      return;
    }
    document.getElementById("load_icon").style.display = "block";
    document.getElementById("login_btn").value = "";
    console.log("login...");
    const username = document.getElementById("field").value;
    const password = document.getElementById("pass_field").value;
    validate_account(username,password);
  }
}

async function validate_account(username, password) {
  var isUsername_valid = false;
  var isPassword_valid = false;
  var data = await database.collection('UserData').where("Profile.Username", "==", username);
  data = await data.get();
  await data.forEach(doc => {
    isUsername_valid = true;
    if (doc.data().Profile.Password == password) {
      isPassword_valid = true;
    }
  });

  if (isUsername_valid == false) {
      data = await database.collection('UserData').where("Profile.Email", "==", username);
      data = await data.get();
      await data.forEach(doc => {
        isUsername_valid = true;
        username = doc.data().Profile.Username;
        if (doc.data().Profile.Password == password) {
          isPassword_valid = true;
        }
      });
  }

  console.log("Username : " + isUsername_valid);
  console.log("Password : " + isPassword_valid);

  if (isUsername_valid && !isPassword_valid) {
    document.getElementById("errors").innerText = "Password was incorrect.";
    document.getElementById("fgt").style.display = "block";
    reset();
  } else if (isUsername_valid && isPassword_valid) {
      window.location.replace("http://localhost:3000?username=" + username);
  } else {
    document.getElementById("errors").innerText = "No Username Found! You can SignUp";
    reset();
  }
}

function typing() {
  if (document.getElementById("pass_field").value.length > 0) {
    if (document.getElementById("field").value.length > 0) {
      document.getElementById("login_btn").style.backgroundColor = "rgb(64, 93, 230)";
    } else {
      reset();
    }
  } else {
    reset();
  }

  if (document.getElementById("errors").innerText.length > 0) {
    document.getElementById("errors").innerText = "";
  }
}

function reset() {
  document.getElementById("login_btn").style.backgroundColor = "rgb(122, 141, 228)";
  document.getElementById("login_btn").value = "Log in";
  document.getElementById("load_icon").style.display = "none";
}

/* Must be replace while uploading */
function goto_signup() {
    window.location.replace("http://localhost:3000/signup");
}

/* Must be replace while uploading */
function fgt() {
  window.location.replace("http://localhost:3000/passforget");
}
