//INITIALIZATION ------------------------------------
KUIDaemon.windows.registerNew(500, 500);
KUIWriter.setWindow(0);

//BACKGROUND ----------------------------------------
KUIWriter.background(new KUIGradient(LINEAR, [[0, [0, 0, 0]], [0.7, [0, 30, 100]]]));

//TITLE ---------------------------------------------
let titleFont = new KUIFont({font: "Courier New", size: 20, color: [255, 255, 255], horizontalAlignment: CENTER, verticalAlignment: MIDDLE});

KUIWriter.createText("Test Calculator App", currentWindow.width / 2, 30, "titleText", titleFont);

//BUTTON --------------------------------------------
KUIWriter.createButton(200, 60, 100, 20, "Start Calc", "startButton", {color: [100, 160, 255], hoverColor: [50, 80, 120], clickedColor: [200, 80, 120]});

currentWindow.getElement("startButton").userOnClick = function() {
    console.log("button clicked");
}

//UPDATE FUNCTION -----------------------------------
currentWindow.userTick = function() {

}