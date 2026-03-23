class KUIWindow {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.elements = [];
        this.elementIDIndex = {}
    }

    start() {
        document.getElementById("window-container").innerHTML += `<canvas id="KUIWindow-${KUIDaemon.windows.opened.length - 1}" width="${this.width}" height="${this.height}" style="border:1px solid black;"></canvas>`;
    }

    tick() {

    }

    getElement(id) {
        return this.elements[this.elementIDIndex[id]];
    }
}