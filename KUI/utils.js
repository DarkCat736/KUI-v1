//consts
const LINEAR = "gradient_linear";
const RADIAL = "gradient_radial";
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