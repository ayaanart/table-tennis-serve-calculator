/*
Started on: 2026-05-03 18:59 ACST South Australia
Author: Ayaan, born on 2010-10-27
Program: p5.js ES6
This handles the button class, for my table tennis calculator.
Also I am learning as I am coding so there might be a lot of comments.
I used to use p5.js ES5 in Khan Academy's environment which is also a bit different than just ES5.
*/

class Button {
    // Animation settings
    static HOVER_SIZE = 2;
    static HOVER_SPEED = 2.3; // around 2 second
    static RETURN_SPEED = 4; // 1 second
    // The function bellow returns what speed is needed to reach the target with a certain accuracy in a x amount of time
    /*
    const time = (time, accuracy = 0.01) => {
        return -Math.log(accuracy) / time 
    };
    */

    // Visual settings
    static STROKE_WIDTH_SCALE = 0.1;

    constructor (x, y, w, h, label, textScale, action) {
        // Position
        this.x = x * Ayaan.p.width;
        this.y = y * Ayaan.p.height;
        // Size
        this.w = w * Ayaan.p.width;
        this.h = h * Ayaan.p.height;
        // Appearance 
        this.label = label;
        this.textSize = Ayaan.text.fitSize(this.w, this.h, this.label) * textScale; 
        this.sizeScale = 1; // An overall scale, applied to all sizes in draw
        // Color is set in updateColor
        this.primaryColor = null;
        this.secondaryColor = null;
        // Behavior 
        this.action = action;
        // Internal tracking
        this.didPressStart = false;
    }
    isHover() {return Ayaan.collision.isPointInRect(Ayaan.p.mouseX, Ayaan.p.mouseY, this.x, this.y, this.w, this.h, "CENTER"); }
    draw() {
        // Set up drawing rect
        Ayaan.p.rectMode(Ayaan.p.CENTER);
        Ayaan.p.fill(...this.primaryColor);
        Ayaan.p.stroke(...this.secondaryColor);
        Ayaan.p.strokeWeight(Math.min(this.w, this.h) * Button.STROKE_WIDTH_SCALE * this.sizeScale); // Use smaller side so both sides fit 
        // Draw rect
        Ayaan.p.rect(this.x, this.y, this.w * this.sizeScale, this.h * this.sizeScale);

        // Set up drawing text
        Ayaan.p.noStroke();
        Ayaan.p.fill(...this.secondaryColor);
        Ayaan.p.textSize(this.textSize * this.sizeScale);
        Ayaan.p.textAlign(Ayaan.p.CENTER, Ayaan.p.CENTER);
        // Draw text
        Ayaan.p.text(this.label, this.x, this.y);
    }
    updateSize(isHover) {
        // Set size based on button condition using exponential decay because we are fancy 🤩
        // Normalize values for the formula based on button conditions
        let target = isHover? Button.HOVER_SIZE : 1; // 1 is always original 
        let speed = isHover? Button.HOVER_SPEED : Button.RETURN_SPEED;

        // Ayaan.dt = deltaTime in seconds
        this.sizeScale =  target
            - (target - this.sizeScale)
            * Math.exp(-speed * Ayaan.dt);
    }
    updateColor(isHover){
        if (isHover) {
            this.primaryColor = Display.color.current.secondary.dark;
            this.secondaryColor = Display.color.current.primary.dark;
        }
        else {
            this.primaryColor = Display.color.current.primary.dark;
            this.secondaryColor = Display.color.current.secondary.dark;
        }
    }
    updateMouse(isHover) {
        if (isHover) {Ayaan.p.cursor("pointer");}
    }
    execute(){
        // What to execute when button is active
        this.action()
        this.sizeScale = 1;
    }
    tick() {
        // Calculate conditions once and store 🎁
        const isHover = this.isHover();
        // Update didPressStart, only true if clicked on or already clicked on & still hovering
        this.didPressStart = isHover && (Ayaan.mouse.justPressed() || this.didPressStart);
        // Only active if mouse is clicked and released on button
        const isActive = isHover && Ayaan.mouse.justReleased() && this.didPressStart

        this.updateSize(isHover);
        this.updateColor(isHover);
        this.updateMouse(isHover);
        if (isActive) {this.execute()}
        this.draw(); // Draw always last
    }
}