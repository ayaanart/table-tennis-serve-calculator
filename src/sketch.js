/*
Started on: 2026-05-03 19:07 ACST South Australia
Author: Ayaan, born on 2010-10-27
Program: p5.js ES6
This is the entry point for my speed dodger game.
*/

// We need to pass in p, because this is instance mode 
const sketch = (p) => {
    // Declare button here, so everything in sketch can see it 👀
    let testBtn; // Button does not exist yet so keep it undefined
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        Ayaan.init(p); // Must be before new button(), Button uses Ayaan.p
        Screens.set("start");
    };

    const onFrameStart = () => {
        Display.update((p.mouseX + p.mouseY) / (p.width + p.height)); // temporary value used in the arg
        Ayaan.update.frameStart();
        p.cursor("default");
        p.background(...Display.color.current.utility.background);
    };
    const onFrameEnd = () => {
        Ayaan.update.frameEnd();
    };

    p.draw = () => {
        onFrameStart();
        Screens.current.tick();
        onFrameEnd();
    };

};

new p5(sketch); // Start

