/*
Started on: 2026-03-22 10:57 ACDT South Australia
Author: Ayaan, born on 2010-10-27
Program: p5.js ES6
This handles the display, for my Speed Dodger game.
Also I am learning as I am coding so there might be a lot of comments.
I used to use p5.js ES5 in Khan Academy's environment which is also a bit different than just ES5.
*/

/*
TODO
- Use p5.js color object instead of basic arrays
- finish the entire object 😅
*/

// Use const because it never changes
const Display = {
    update: function(percent = 0) {
        // ! Call this at the start of every frame !

        const current = this.color.default;

        // Recalculate all the colors
        for (let i = 0; i < 3; i+= 1) {
            Display.color.current.primary.dark[i] = Ayaan.p.lerp(current.start.primary.dark[i], current.end.primary.dark[i], percent);
            Display.color.current.primary.light[i] = Ayaan.p.lerp(current.start.primary.light[i], current.end.primary.light[i], percent);
            
            Display.color.current.secondary.dark[i] = Ayaan.p.lerp(current.start.secondary.dark[i], current.end.secondary.dark[i], percent);
            Display.color.current.secondary.light[i] = Ayaan.p.lerp(current.start.secondary.light[i], current.end.secondary.light[i], percent);

            Display.color.current.utility.background[i] = Ayaan.p.lerp(current.start.utility.background[i], current.end.utility.background[i], percent);
            Display.color.current.utility.accent[i] = Ayaan.p.lerp(current.start.utility.accent[i], current.end.utility.accent[i], percent);
        };
    },

    color: {
        default: {
            start: {            
                primary: {
                    dark: [100, 0, 100],
                    light: [150, 0, 150],
                },
                secondary: {
                    dark: [250, 150, 0],
                    light: [250, 200, 50],
                },
                utility: {
                    background: [50, 0, 50],
                    accent: [250, 250, 100],
                }
            },
            end: { 
                primary: {
                    dark: [110, 0, 90],
                    light: [160, 0, 140],
                },
                secondary: {
                    dark: [255, 140, 5],
                    light: [255, 190, 60],
                },
                utility: {
                    background: [60, 0, 40],
                    accent: [255, 240, 105],
                }
            },
        },
        current: {
            primary: {
                dark: [],
                light: [],
            },
            secondary: {
                dark: [],
                light: [],
            },
            utility: {
                background: [],
                accent: [],
            }
        },
    },
    render: {
        usePNG: false, // If not PNGs, use shapes
        showHitBox: false,    
    },
};