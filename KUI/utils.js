//consts
const LINEAR = "gradient_linear";
const RADIAL = "gradient_radial";
const CENTER = "center";
const LEFT = "left";
const RIGHT = "right";
const TOP = "top";
const MIDDLE = "middle";
const BOTTOM = "bottom";
let currentWindow = null;

class KUIGradient {
    constructor(gradientType = LINEAR, stops = [[0, [0, 0, 0]], [1, [255, 255, 255]]]) {
        this.gradientType = gradientType;
        this.gradientStops = stops;
    }

    generateCanvasGradient(x0, y0, x1, y1, r0 = null, r1 = null) {
        if (this.gradientType === LINEAR) {
            this.generatedGradient = KUIWriter.winCtx.createLinearGradient(x0, y0, x1, y1);
        } else if (this.gradientType === RADIAL) {
            this.generatedGradient = KUIWriter.winCtx.createRadialGradient(x0, y0, r0, x1, y1, r1);
        } else {
            console.error("KUIGradient: Parameter 'gradientType' has been assigned a value of the wrong type. Use either the 'RAIDIAL' or 'LINEAR' constants for this parameter.");
        }

        for (let i = 0; i < this.gradientStops.length; i++) {
            this.generatedGradient.addColorStop(this.gradientStops[i][0], `rgb(${this.gradientStops[i][1][0]}, ${this.gradientStops[i][1][1]}, ${this.gradientStops[i][1][2]})`);
        }

        return this.generatedGradient;
    }
}

class KUIFont {
    constructor({font = "Arial", size = 30, color = [0, 0, 0], horizontalAlignment = LEFT, verticalAlignment = TOP} = {}) {
        this.font = font;
        this.size = size;
        this.color = color;
        this.horizontalAlignment = horizontalAlignment;
        this.verticalAlignment = verticalAlignment;
    }

    setContextToFont() {
        KUIWriter.winCtx.font = `${this.size}px ${this.font}`;
        KUIWriter.winCtx.fillStyle = `rgb(${this.color[0]}, ${this.color[1]}, ${this.color[2]})`;
        KUIWriter.winCtx.textAlign = this.horizontalAlignment;
        KUIWriter.winCtx.textBaseline = this.verticalAlignment;
    }
}