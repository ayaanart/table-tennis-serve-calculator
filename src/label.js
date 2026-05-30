/*
Started on: 2026-04-05 15:02 ACST (South Australia)
Author: Ayaan, born on 2010-10-27
Program: p5.js ES6
Class for all basic text
*/

class Label {
    constructor(string, x, y, w, h){
        this.string = typeof string === "function"? string : () => {return string;};
        
        this.x = x * Ayaan.p.width;
        this.y = y * Ayaan.p.height;
        this.w = w * Ayaan.p.width;
        this.h = h * Ayaan.p.height;
    }
    getColor() {
        // This is a function, because the colors change very often
        return Display.color.current.secondary.dark;
    }
    draw() {
        const p = Ayaan.p;

        p.textSize(Ayaan.text.fitSize(this.w, this.h, this.string())); // Text may change so we recalculate
        p.noStroke();
        p.fill(...this.getColor());
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(this.textSize);    
        p.text(this.string(), this.x, this.y, this.w, this.h)
    }
    tick() {
        this.draw();
    }
}