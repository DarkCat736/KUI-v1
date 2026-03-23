let KUIWriter = {
    currentWindowEditing: 0,
    winCtx: null,
    setWindow: function(windowIndex) {
        this.currentWindowEditing = windowIndex;
        let windowCanvas = document.getElementById("KUIWindow-"+this.currentWindowEditing);
        this.winCtx = windowCanvas.getContext("2d");
        currentWindow = KUIDaemon.windows.opened[this.currentWindowEditing];
    },
    background: function(color, {x0 = null, y0 = null, x1 = null, y1 = null, r0 = null, r1 = null} = {}) {
        if (color instanceof KUIGradient) {
            if (color.gradientType === RADIAL) {
                if (x0 == null) {x0 = currentWindow.width/2}
                if (y0 == null) {y0 = currentWindow.height/2}
                if (x1 == null) {x1 = currentWindow.width/2}
                if (y1 == null) {y1 = currentWindow.height/2}
                if (r0 == null) {r0 = 0}
                if (r1 == null) {r1 = currentWindow.width/2}

                this.winCtx.fillStyle = color.generateCanvasGradient(x0, y0, x1, y1, r0, r1);
            }
            if (color.gradientType === LINEAR) {
                if (x0 == null) {x0 = 0}
                if (y0 == null) {y0 = 0}
                if (x1 == null) {x1 = currentWindow.width}
                if (y1 == null) {y1 = currentWindow.height}

                this.winCtx.fillStyle = color.generateCanvasGradient(x0, y0, x1, y1);
            }
            this.winCtx.fillRect(0, 0, currentWindow.width, currentWindow.height);
        } else {
            this.winCtx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
            this.winCtx.fillRect(0, 0, currentWindow.width, currentWindow.height);
        }
    },
    createButton: function(x, y, w, h, id, {color = [200, 200, 200], hoverColor = null, clickedColor = null} = {}) {
        currentWindow.elements.push(new KUIButton(x, y, w, h, {color: color, hoverColor: hoverColor, clickedColor: clickedColor}));
        currentWindow.elementIDIndex[id] = currentWindow.elements.length - 1;
    }
}

class KUIButton {
    constructor(x, y, w, h, {color = [200, 200, 200], hoverColor = null, clickedColor = null} = {}) {
        this.xPos = x;
        this.yPos = y;
        this.width = w;
        this.height = h;
        this.currentFill = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
        this.defaultColor = color;
        if (hoverColor == null) {
            this.hoverColor = [this.defaultColor[0]+10, this.defaultColor[1]+10, this.defaultColor[2]+10];
        } else {
            this.hoverColor = hoverColor;
        }

        if (clickedColor == null) {
            this.clickedColor = [this.defaultColor[0]-20, this.defaultColor[1]-20, this.defaultColor[2]-20];
        } else {
            this.clickedColor = clickedColor;
        }
    }

    tick() {
        this.checkHover();
        KUIWriter.winCtx.fillStyle = this.currentFill;
        KUIWriter.winCtx.roundRect(this.xPos, this.yPos, this.width, this.height, 10);
        KUIWriter.winCtx.fill();
    }

    checkHover() {
        if (KUIMouse.x >= this.xPos && KUIMouse.x <= this.xPos + this.width && KUIMouse.y >= this.yPos && KUIMouse.y <= this.yPos + this.height) {
            this.currentFill = `rgb(${this.hoverColor[0]}, ${this.hoverColor[1]}, ${this.hoverColor[2]})`;
            this.checkClicked();
            return true;
        } else {
            this.currentFill = `rgb(${this.defaultColor[0]}, ${this.defaultColor[1]}, ${this.defaultColor[2]})`;
            return false;
        }
    }

    checkClicked() {
        if (KUIMouse.clicked) {
            this.currentFill = `rgb(${this.clickedColor[0]}, ${this.clickedColor[1]}, ${this.clickedColor[2]})`;
        }
    }
}