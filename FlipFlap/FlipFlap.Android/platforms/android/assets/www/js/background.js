// This is a background service worker script that 
// initializes the application on Google Chrome OS
chrome.app.runtime.onLaunched.addListener(function () {
 chrome.app.window.create('default.html', {
       "bounds": {
          "width": 400,
          "height": 600
       }
    });
});

