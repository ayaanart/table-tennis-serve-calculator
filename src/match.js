/*
Started on: 2026-05-03 19:14 ACST South Australia
Author: Ayaan, born on 2010-10-27
Program: p5.js ES6
This stores the score and rules of the current match.
*/

const match = {
    score: {
        team1: 0,
        team2: 0,
        get total() {
            return this.team1 + this.team2;
        },
    },
    rules: {
        numberOfPlayers: 4,
        winThreshold: 10, // You have to be greater than the threshold to win | if both players reach this, deuce starts
        winByMinimum: 2,
        servesPerPlayerBeforeDeuce: 2,
        servesPerPlayerDuringDeuce: 1,
    },

    // These are the default player names, the user can change them
    // The player names are in the order of serves (eg playerNames[2] = the third person who served)
    playerNames: ["First Server", "Second Server", "Third Server", "Fourth Server"],
};