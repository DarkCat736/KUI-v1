let KUIMouse = {
    x: 0,
    y: 0,
    trueX: 0,
    trueY: 0,
    event: null,
    clicked: false,
    clickedDownFrame: false,
    calcMousePosRelativeToCurrentWindow: function(mouseEvent) {
        const windowBoundingBox = document.getElementById("KUIWindow-"+KUIWriter.currentWindowEditing).getBoundingClientRect();

        this.x = this.trueX - windowBoundingBox.left;
        this.y = this.trueY - windowBoundingBox.top;
    }
}

document.getElementById("window-container").addEventListener('mousemove', function(event) {
    KUIMouse.trueX = event.clientX;
    KUIMouse.trueY = event.clientY;
}, false);

document.getElementById("window-container").addEventListener('mousedown', function(event) {
    KUIMouse.clicked = true;
}, false);

document.getElementById("window-container").addEventListener('mouseup', function(event) {
    KUIMouse.clicked = false;
}, false);