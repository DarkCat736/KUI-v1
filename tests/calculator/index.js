KUIDaemon.windows.registerNew(500, 500);
KUIWriter.setWindow(0);

KUIWriter.background(new KUIGradient(LINEAR, [[0, [0, 0, 0]], [0.7, [0, 30, 100]]]));

KUIWriter.createButton(50, 50, 100, 20, "button1", {color: [100, 160, 255], hoverColor: [50, 80, 120], clickedColor: [200, 80, 120]});

currentWindow.tick = function() {
    currentWindow.getElement("button1").defaultColor[2] = Math.random()*255;
}