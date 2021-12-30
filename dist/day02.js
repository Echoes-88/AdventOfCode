"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const data = fs_1.default.readFileSync('dist/data/day02.txt', 'utf-8').split(/\r\n|\n\r|\n|\r/);
// 1
let forwardMoves = [];
let downMoves = [];
let upMoves = [];
data.map(move => {
    move.includes("forward") && forwardMoves.push(move.match(/\d+/)?.[0]);
    move.includes("down") && downMoves.push(move.match(/\d+/)?.[0]);
    move.includes("up") && upMoves.push(move.match(/\d+/));
});
let amountForward = forwardMoves.reduce((prev, curr) => parseInt(prev) + parseInt(curr));
let amountDown = downMoves.reduce((prev, curr) => parseInt(prev) + parseInt(curr));
let amountUp = upMoves.reduce((prev, curr) => parseInt(prev) + parseInt(curr));
let finalDepth = amountDown - amountUp;
console.log("answer 1", amountForward * finalDepth);
// 2
let aim = 0;
let horizontalPosition = 0;
let depth = 0;
const allMoves = [];
data.map(move => {
    move.includes("forward") && allMoves.push({ type: "forward", amount: move.match(/\d+/)?.[0] });
    move.includes("down") && allMoves.push({ type: "down", amount: move.match(/\d+/)?.[0] });
    move.includes("up") && allMoves.push({ type: "up", amount: move.match(/\d+/)?.[0] });
});
allMoves.map(move => {
    if (move.type === "forward") {
        horizontalPosition = horizontalPosition + parseInt(move.amount);
        depth = depth + (parseInt(move.amount) * aim);
    }
    if (move.type === "down") {
        aim = aim + parseInt(move.amount);
    }
    if (move.type === "up") {
        aim = aim - parseInt(move.amount);
    }
});
console.log("answer 2", depth * horizontalPosition);
