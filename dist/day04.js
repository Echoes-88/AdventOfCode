"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const data = fs_1.default.readFileSync('dist/data/day04.txt', 'utf-8').split(`"`);
// PARSED DATA
const filteredData = data.map(elt => elt.replace(/(?:\r\n|\r|\n)/g, " ")).filter(elt => elt.length >= 2).map(elt => elt.split(' ').filter(elt => elt.length !== 0));
const pickedNumbers = filteredData[0].map(elt => elt.split(","));
let boards = filteredData[1].map((_, index) => index % 25 === 0 && filteredData[1].slice(index, index + 25)).filter(e => e).map(board => board && board.map(number => parseInt(number)));
// WINNING NUMBERS
const boardLines = 5;
const boardColumns = 5;
const amountBoardNumber = boardLines * boardColumns;
const winningValuesArray = [];
let index = 0;
while (index < amountBoardNumber) {
    if (index % 5 === 0) {
        let currIndex = index;
        const numbers = [];
        let max = index + boardLines - 1;
        while (currIndex <= max) {
            numbers.push(currIndex);
            currIndex++;
        }
        winningValuesArray.push(numbers);
    }
    if (index < boardColumns) {
        let currentNumber = index;
        const numbers = [];
        numbers.push(currentNumber);
        for (let i = 0; i < boardLines - 1; i++) {
            currentNumber = currentNumber + boardColumns;
            numbers.push(currentNumber);
        }
        winningValuesArray.push(numbers);
    }
    index++;
}
console.log(winningValuesArray);
// PLAY
// let tempBoards = [...boards]
let winningBoards = [];
let lastWinningBoard;
let currentTirage = 0;
while (currentTirage < pickedNumbers[0].length) {
    pickedNumbers[0].forEach((number, index) => {
        boards = boards.map((board) => board.map((nbr) => parseInt(nbr) === parseInt(number) ? "X" : nbr));
        boards.forEach((board, i) => winningValuesArray.forEach((winningValues) => {
            let amountGoodValues = 0;
            winningValues.map((value) => isNaN(board[value]) && amountGoodValues++);
            if (amountGoodValues === 5) {
                !winningBoards.some((board) => board.boardNumber === i) &&
                    winningBoards.push({ tirage: currentTirage, board, boardNumber: i, pickNumber: number });
            }
        }));
        currentTirage++;
    });
}
console.log("first answer", winningBoards[0]);
console.log("second answer", winningBoards[winningBoards.length - 1]);
