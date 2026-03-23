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
        currentWindow.background = new KUIBackground(color, {x0: x0, y0: y0, x1: x1, y1: y1, r0: r0, r1: r1});
    },
    createButton: function(x, y, w, h, text, id, {color = [200, 200, 200], hoverColor = null, clickedColor = null} = {}) {
        currentWindow.elements.push(new KUIButton(x, y, w, h, text, {color: color, hoverColor: hoverColor, clickedColor: clickedColor}));
        currentWindow.elementIDIndex[id] = currentWindow.elements.length - 1;
    },
    createText: function(text, x, y, id, KUIFontObject = new KUIFont()) {
        currentWindow.elements.push(new KUIText(text, x, y, KUIFontObject));
        currentWindow.elementIDIndex[id] = currentWindow.elements.length - 1;
    }
}

class KUIBackground {
    constructor(color, {x0 = null, y0 = null, x1 = null, y1 = null, r0 = null, r1 = null} = {}) {
        this.color = color;
        this.x0 = x0;
        this.x1 = x1;
        this.y0 = y0;
        this.y1 = y1;
        this.r0 = r0;
        this.r1 = r1;
    }

    tick() {
        if (this.color instanceof KUIGradient) {
            if (this.color.gradientType === RADIAL) {
                if (this.x0 == null) {this.x0 = currentWindow.width/2}
                if (this.y0 == null) {this.y0 = currentWindow.height/2}
                if (this.x1 == null) {this.x1 = currentWindow.width/2}
                if (this.y1 == null) {this.y1 = currentWindow.height/2}
                if (this.r0 == null) {this.r0 = 0}
                if (this.r1 == null) {this.r1 = currentWindow.width/2}

                KUIWriter.winCtx.fillStyle = this.color.generateCanvasGradient(this.x0, this.y0, this.x1, this.y1, this.r0, this.r1);
            }
            if (this.color.gradientType === LINEAR) {
                if (this.x0 == null) {this.x0 = 0}
                if (this.y0 == null) {this.y0 = 0}
                if (this.x1 == null) {this.x1 = currentWindow.width}
                if (this.y1 == null) {this.y1 = currentWindow.height}

                KUIWriter.winCtx.fillStyle = this.color.generateCanvasGradient(this.x0, this.y0, this.x1, this.y1);
            }
            KUIWriter.winCtx.fillRect(0, 0, currentWindow.width, currentWindow.height);
        } else {
            KUIWriter.winCtx.fillStyle = `rgb(${this.color[0]}, ${this.color[1]}, ${this.color[2]})`;
            KUIWriter.winCtx.fillRect(0, 0, currentWindow.width, currentWindow.height);
        }
    }
}

class KUIButton {
    constructor(x, y, w, h, text, {color = [200, 200, 200], hoverColor = null, clickedColor = null, KUIFontObject = null} = {}) {
        if (KUIFontObject == null) {
            this.KUIFontObject = new KUIFont({size: h * 0.7, horizontalAlignment: CENTER, verticalAlignment: MIDDLE});
        } else {
            this.KUIFontObject = KUIFontObject;
        }

        this.KUITextObject = new KUIText(text, x + w/2, y + h/2, this.KUIFontObject);

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
        this.KUITextObject.tick();
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

    onClick() {
        if (KUIMouse.x >= this.xPos && KUIMouse.x <= this.xPos + this.width && KUIMouse.y >= this.yPos && KUIMouse.y <= this.yPos + this.height) {
            this.userOnClick();
        }
    }

    userOnClick() {

    }
}

class KUIText {
    constructor(text, x, y, KUIFontObject = new KUIFont()) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.KUIFontObject = KUIFontObject;
    }

    tick() {
        this.KUIFontObject.setContextToFont();
        KUIWriter.winCtx.fillText(this.text, this.x, this.y);
    }
}