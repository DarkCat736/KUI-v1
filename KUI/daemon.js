let KUIDaemon = {
    windows: {
        registerNew: function(width, height) {
            this.opened.push(new KUIWindow(width, height));
            this.opened[this.opened.length - 1].start();
        },
        opened: []
    },
    tick: function() {
        //tick all windows
        for (let i = 0; i < KUIDaemon.windows.opened.length; i++) {
            KUIMouse.calcMousePosRelativeToCurrentWindow();
            KUIDaemon.windows.opened[i].tick();
        }

        //always MUST end with calling the function again
        requestAnimationFrame(KUIDaemon.tick);
    },
    start: function() {
        requestAnimationFrame(KUIDaemon.tick);
    }
}