class KUIWindow {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.elements = [];
        this.elementIDIndex = {}
        this.background = new KUIBackground([0, 0, 0]);
    }

    start() {
        document.getElementById("window-container").innerHTML += `<canvas id="KUIWindow-${KUIDaemon.windows.opened.length - 1}" width="${this.width}" height="${this.height}" style="border:1px solid black;"></canvas>`;
        let index = KUIDaemon.windows.opened.length - 1;
        document.getElementById(`KUIWindow-${KUIDaemon.windows.opened.length - 1}`).addEventListener('click', function(event) {
            KUIDaemon.windows.opened[index].runOnClicks();
        }, false);
    }

    tick() {
        KUIWriter.winCtx.clearRect(0, 0, currentWindow.width, currentWindow.height);

        this.background.tick();

        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].tick();
        }

        this.userTick();
    }

    runOnClicks() {
        for (let i = 0; i < this.elements.length; i++) {
            if (this.elements[i].onClick !== undefined) {
                this.elements[i].onClick();
            }
        }
    }

    userTick() {

    }

    getElement(id) {
        return this.elements[this.elementIDIndex[id]];
    }
}