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
            KUIDaemon.windows.opened[i].tick();
            for (let e = 0; e < KUIDaemon.windows.opened[i].elements.length; e++) {
                KUIDaemon.windows.opened[i].elements[i].tick();
            }
        }

        KUIMouse.calcMousePosRelativeToCurrentWindow();

        //always MUST end with calling the function again
        requestAnimationFrame(KUIDaemon.tick);
    },
    start: function() {
        requestAnimationFrame(KUIDaemon.tick);
    }
}