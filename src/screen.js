/*
Started on: 2026-05-04 17:00 ACST (South Australia)
Author: Ayaan, born on 2010-10-27
Program: p5.js ES6
*/

const Screens = {
    current: null,

    start: null,
    calculator: null,

    set(name) {
        this.current = this[name];
        this.current.init?.();
    }
};

// Make all the main screen
Screens.start = {
    elements: [],

    init() {
        this.elements = [];

        // Buttons
        this.elements.push(new Button(0.5, 0.5, 0.5, 0.2, "Calculate", 1, () => {Screens.set("calculator");}));
        
    },

    tick() {
        this.elements.forEach(e => e.tick());
    },

};
Screens.calculator = {
    elements: [],

    init() {
        this.elements = [];

        // Buttons
            // Constants
            const TOP_LEFT_X_POS = 0.6;
            const TOP_LEFT_Y_POS = 0.6;
            const BUTTON_SIZE = 0.1;
            const PADDING = BUTTON_SIZE * 0.4;
            const SPACING = PADDING + BUTTON_SIZE;

            const LEFT_X = TOP_LEFT_X_POS;
            const RIGHT_X = TOP_LEFT_X_POS + SPACING;
            const TOP_Y = TOP_LEFT_Y_POS;
            const BOTTOM_Y = TOP_LEFT_Y_POS + SPACING;

            // Main
            this.elements.push(new Button(LEFT_X, TOP_Y, BUTTON_SIZE, BUTTON_SIZE, "P1+", 1, ()=> {match.score.team1 += 1;}));
            this.elements.push(new Button(RIGHT_X, TOP_Y, BUTTON_SIZE, BUTTON_SIZE, "P2+", 1, ()=> {match.score.team2 += 1;}));
            this.elements.push(new Button(LEFT_X, BOTTOM_Y, BUTTON_SIZE, BUTTON_SIZE, "P1-", 1, ()=> {match.score.team1 -= 1}));
            this.elements.push(new Button(RIGHT_X, BOTTOM_Y, BUTTON_SIZE, BUTTON_SIZE, "P2-", 1, ()=> {match.score.team2 -= 1}));

            // Switch player number button
            const TOP_RIGHT_X_POS = 0.9;
            const TOP_RIGHT_Y_POS = 0.1;
            this.elements.push(new Button(TOP_RIGHT_X_POS, TOP_RIGHT_Y_POS, BUTTON_SIZE, BUTTON_SIZE, "Switch", 1, ()=> {
                match.rules.numberOfPlayers = match.rules.numberOfPlayers === 4? 2 : 4;
                Screens.set("calculator");
            }));
            
        // Text
            this.elements.push(new Label(() => {return calc.whatServe(match)}, 0.5, 0.2, 0.5, 0.3));
            this.elements.push(new Label(() => {return `Score 1: ${match.score.team1}\nScore 2: ${match.score.team2}`}, 
                0.3, 0.7, 0.3, 0.3));
    },

    tick() {
        this.elements.forEach(e => e.tick());
    },

};
