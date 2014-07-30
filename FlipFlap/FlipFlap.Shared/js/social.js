var client = new WindowsAzure.MobileServiceClient(
    "https://flipflap.azure-mobile.net/",
    "rrJwzLmjPphORcUDVsXRBdPnGEELkq35"
);

// GOOGLE

function handleGoogleLogin(){
	client.login("google").then(function(ev){
		console.log(ev);	
	}, function(error){
        alert(error);
    });
}


// FACEBOOK
// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
	console.log('statusChangeCallback');
	console.log(response);
	// The response object is returned with a status field that lets the
	// app know the current login status of the person.
	// Full docs on the response object can be found in the documentation
	// for FB.getLoginStatus().
	if (response.status === 'connected') {
	  // Logged into your app and Facebook.
	  fbAPI();
	} else if (response.status === 'not_authorized') {
	  // The person is logged into Facebook, but not your app.
	  document.getElementById('status').innerHTML = 'Please log ' +
		'into this app.';
	} else {
	  // The person is not logged into Facebook, so we're not sure if
	  // they are logged into this app or not.
	  document.getElementById('status').innerHTML = 'Please log ' +
		'into Facebook.';
	}
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
	FB.getLoginStatus(function(response) {
	  statusChangeCallback(response);
	});
}

window.fbAsyncInit = function() {
	FB.init({
	appId      : '676793462391035',
	cookie     : true,  // enable cookies to allow the server to access 
						// the session
	xfbml      : true,  // parse social plugins on this page
	version    : 'v2.0' // use version 2.0
	});

    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.

    FB.getLoginStatus(function(response) {
	  statusChangeCallback(response);
    });
};

// Load the SDK asynchronously
(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "http://connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function fbAPI() {
	console.log('Welcome!  Fetching your information.... ');
	FB.api('/me', function(response) {
	  console.log('Successful login for: ' + response.name);
// 	  document.getElementById('status').innerHTML =
// 		'\nThanks for logging in, ' + response.name + '!';
	});
}


// var fb_u = { text: "Facebook User" };
// client.getTable("Facebook_Users").insert(fb_u);
// 
// var tw_t = { };
// client.getTable("Twitter_Users").insert(tw_u);

