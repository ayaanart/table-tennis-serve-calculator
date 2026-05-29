/*
Started on: 2026-05-03 19:07 ACST South Australia
Author: Ayaan, born on 2010-10-27
Program: p5.js ES6
This is the logic for my table tennis calculator! 🏓 
*/

/*
Relevant Rules of Table Tennis:
    Number of serves:
        - Each player serves twice if the game is not in deuce
        - Each player serves once if the game is in deuce
    Deuce:
        Deuce is a state of the game that changes serving.
        It starts when both players score >= to the win threshold
    Winning:
    A player/team wins when both: 
    - Their score is > than the win threshold 
    - They have a 2 point difference from the other team/player
*/
const calc = {

    whatServe(match) {
        const state = this.state(match);
        if (!state.isValid) {
            return "Oops! You input an invalid score :>"
        }

        if (typeof state.winner === "number") {
            return `Team ${state.winner} has won! Good game!`
        }

        return `${this.getPlayerName(match.playerNames, state.server)}'s ${state.serveType} serve`; // Example: Sam's only serve
    },
    getPlayerName(names, number) {
        return names[number-1];
    },
    state(match) {
        const score = match.score;
        const isDeuce = match.score.team1 >= match.rules.winThreshold && match.score.team2 >= match.rules.winThreshold;
        const diffInScore = Math.abs(score.team1 - score.team2);
        // A team can validly reach winThreshold + 1 (e.g. 11), so only flag scores beyond that as suspicious
        const anyTeamOverWinScore = score.team1 > match.rules.winThreshold + 1|| score.team2 > match.rules.winThreshold + 1;
        const noNegatives = score.team1 >= 0 && score.team2 >= 0;

        return {
            winner: this.getWinner(match, diffInScore),
            server: this.getServer(match, isDeuce),
            serveType: this.getServeType(match.score, isDeuce),
            isValid: noNegatives && (!anyTeamOverWinScore || diffInScore <= match.rules.winByMinimum), 
        }
    },
    getWinner(match, diff) {
        const meetsWinMargin = diff >= match.rules.winByMinimum;
        if (match.score.team1 > match.rules.winThreshold && meetsWinMargin) {return 1;}
        if (match.score.team2 > match.rules.winThreshold && meetsWinMargin) {return 2;}
        return null;
    },
    getServer(match, isDeuce) {
        const maxNonDeuceScore = match.rules.winThreshold * 2;
        const serverSwitchesBeforeDeuce = Math.floor(Math.min(maxNonDeuceScore, match.score.total)/match.rules.servesPerPlayerBeforeDeuce);
        const serverSwitchesDuringDeuce = Math.floor(Math.max(0, match.score.total - maxNonDeuceScore)/match.rules.servesPerPlayerDuringDeuce);
        const totalServerSwitches = serverSwitchesBeforeDeuce + serverSwitchesDuringDeuce;
        const currentPlayerIndex = totalServerSwitches % match.rules.numberOfPlayers;

        return currentPlayerIndex + 1; // +1 converts to player number (was 0 index)
    },
    getServeType(score, isDeuce) {
        if (isDeuce) {return "only";}
        return score.total % 2 === 0? "first" : "second";
    },
};