//from here: http://stackoverflow.com/questions/950087/how-to-include-a-javascript-file-in-another-javascript-file
function importScript(url, callback) {
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}

importScript("//Microsoft.Xbox.WinJS.1.0/js/base.js");
importScript("//Microsoft.Xbox.WinJS.1.0/js/ui.js");
importScript("//Microsoft.Xbox.WinJS.1.0/js/xbox.js", function (e) {
    if (e.type === 'readystatechange') {
        xboxInit();
    }
});

var Xbox = {};

function xboxInit() {
    "use strict";


    var voice = XboxJS.UI.Voice;

    var voiceHandle = function (ev) {
        if (ev.phrase === 'left') {
            game.direction = "left";
            if (gameGrid.canMove(game.direction)) {
                $('#flipper').removeClass().addClass('rotateLeft');
            }
        } else if (ev.phrase === 'right') {
            game.direction = "right";
            if (gameGrid.canMove(game.direction)) {
                $('#flipper').removeClass().addClass('rotateRight');
            }
        } else if (ev.phrase === 'up') {
            game.direction = "up";
            if (gameGrid.canMove(game.direction)) {
                $('#flipper').removeClass().addClass('rotateUp');
            }
        } else if (ev.phrase === 'down') {
            game.direction = "down";
            if (gameGrid.canMove(game.direction)) {
                $('#flipper').removeClass().addClass('rotateDown');
            }
        }
    }

    Xbox.initVoice = function(){
        voice.registerGlobalCommand('left', voiceHandle, 0.55, null);
        voice.registerGlobalCommand('right', voiceHandle, 0.55, null);
        voice.registerGlobalCommand('up', voiceHandle, 0.55, null);
        voice.registerGlobalCommand('down', voiceHandle, 0.55, null);
    }

};
