var client = new WindowsAzure.MobileServiceClient(
    "https://flipflap.azure-mobile.net/",
    "rrJwzLmjPphORcUDVsXRBdPnGEELkq35"
);

function googleLogIn() {
		client.login("google").then(function(ev){
			console.log(ev);
     		refreshAuthDisplay();
		},  function(error){
			alert(error);
		});
		getPlayerInfo();
}

function facebookLogIn() {
		client.login("facebook").then(function(ev){
			console.log(ev);
			refreshAuthDisplay();	
		}, function(error){
			alert(error);
		});
		getPlayerInfo();
}

function twitterLogIn() {
		client.login("twitter").then(function(ev){
			console.log(ev);
			refreshAuthDisplay();	
		}, function(error){
			alert(error);
		});
		getPlayerInfo();
}

function logOut() {
	$('a.log-out').click(function() {
		client.logout();
		refreshAuthDisplay();
		$('#summary').html('<strong>You must login to access data.</strong>');
	});
}

// On page init, fetch the data and set up event handlers
$(function () {
    refreshAuthDisplay();
    $('#summary').html('<strong>You must login to access data.</strong>');          
    $("#log-in").click(login);
    $("#log-out").click(logOut);
});

function displayUserInfo() {

}

var playerTable = client.getTable("Players");

function getPlayerInfo(item, user, request)
{
	item.UserName = "<unknown>"; // default
    user.getIdentities({
        success: function (identities) {
            var url = null;
            var oauth = null;
            if (identities.google) {
                var googleAccessToken = identities.google.accessToken;
                url = 'https://www.googleapis.com/oauth2/v3/userinfo?access_token=' + googleAccessToken;
            } else if (identities.facebook) {
                var fbAccessToken = identities.facebook.accessToken;
                url = 'https://graph.facebook.com/me?access_token=' + fbAccessToken;
            } else if (identities.microsoft) {
                var liveAccessToken = identities.microsoft.accessToken;
                url = 'https://apis.live.net/v5.0/me/?method=GET&access_token=' + liveAccessToken;
            } else if (identities.twitter) {
                var userId = user.userId;
                var twitterId = userId.substring(userId.indexOf(':') + 1);
                url = 'https://api.twitter.com/1.1/users/show.json?user_id=' + twitterId;
                var consumerKey = process.env.MS_TwitterConsumerKey;
                var consumerSecret = process.env.MS_TwitterConsumerSecret;
                oauth = {
                    consumer_key: consumerKey,
                    consumer_secret: consumerSecret,
                    token: identities.twitter.accessToken,
                    token_secret: identities.twitter.accessTokenSecret
                };
            }
 
            if (url) {
                var requestCallback = function (err, resp, body) {
                    if (err || resp.statusCode !== 200) {
                        console.error('Error sending data to the provider: ', err);
                        request.respond(statusCodes.INTERNAL_SERVER_ERROR, body);
                    } else {
                        try {
                            var userData = JSON.parse(body);
                            item.UserName = userData.name;
                            request.execute();
                        } catch (ex) {
                            console.error('Error parsing response from the provider API: ', ex);
                            request.respond(statusCodes.INTERNAL_SERVER_ERROR, ex);
                        }
                    }
                }
                var req = require('request');
                var reqOptions = {
                    uri: url,
                    headers: { Accept: "application/json" }
                };
                if (oauth) {
                    reqOptions.oauth = oauth;
                }
                req(reqOptions, requestCallback);
            } else {
                // Insert with default user name
                
                console.log("Can't Add Player");
            }
        }
    });
}

// var newTuple = document.getElementById("someInput").value;
// var item = { PostItNote: document.getElementById("someInput").value};
// 
// testTable.insert(item);
//  
// Querying the DB:
//  
// function searchPlayer(){
// 	var query = playerTable; //Give it column name
// 	console.log("GOT POST UserInfo");
// 	//console.log("type of element: "+element);
// 	query.read().then(function (results) {
// 	for (var i = 0; i < results.length; i++) {
// 		console.log(results[i].id);
// 	// handle results
// 	}
//   });
// }






