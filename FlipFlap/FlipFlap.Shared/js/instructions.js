var images = ['img/instruction1.png', 'img/instruction=2.png'];

function startInsturctions() {
    //TODO: show hidden instructions div
    //TODO: Loop through images array
    //TODO: show image on HTML DOM
    //TODO: show next button
    //TODO: when end call endInstructions
}

function endInsturctions() {
    //TODO: hide hidden instructions div
    window.localStorage.setItem("hasUserRun", "yes");
    init();
}
// Helper function for detecting if localStorage is supported
function hasUserRunBefore() {
    if (supportsLocalStorage()) {
        var check = window.localStorage.getItem("hasUserRun");
        //window.localStorage.setItem("");
        if (check === "yes") {
            return true;
        } else {
            return false;
        }
    }
}

// Helper function for detecting if user has read the insturctions before
function supportsLocalStorage() {
    try {
        return 'localStorage' in window && windows['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}