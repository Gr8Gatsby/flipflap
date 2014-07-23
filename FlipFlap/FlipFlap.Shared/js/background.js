chrome.app.runtime.onLaunched.addListener(function() {
 chrome.app.window.create('default.html', {
       "bounds": {
          "width": 300,
          "height": 340
       }
    });
});

