"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const data = fs_1.default.readFileSync('dist/data/day03.txt', 'utf-8').split(/\r\n|\n\r|\n|\r/);
const dataFiltered = data.map((numbers) => numbers.split(''));
// PART ONE
const gamma = [];
const epsilon = [];
const arrayLength = dataFiltered[0].length;
const bitMostCommonNumbers = Array.from({ length: arrayLength }, () => ({ zero: 0, one: 0 }));
dataFiltered.map((number) => number.map((number, i) => number === '0' ?
    bitMostCommonNumbers[i].zero++
    :
        bitMostCommonNumbers[i].one++));
bitMostCommonNumbers.map(data => data.zero > data.one ? gamma.push("0") && epsilon.push("1") : gamma.push("1") && epsilon.push("0"));
const result = parseInt(gamma.toString().replace(/,/g, ''), 2) * parseInt(epsilon.toString().replace(/,/g, ''), 2);
console.log(result);
// PART TWO
var DataType;
(function (DataType) {
    DataType["OXYGEN"] = "oxygen";
    DataType["CO2"] = "co2";
})(DataType || (DataType = {}));
const getResult = (type) => {
    let amountZero = 0;
    let amountOne = 0;
    let currentIndex = 0;
    let currentData = dataFiltered;
    while (currentIndex <= dataFiltered[0].length && currentData.length > 1) {
        currentData.map(number => number[currentIndex] === "0" ? amountZero++ : amountOne++);
        currentData = currentData.filter(number => {
            if (amountZero === amountOne) {
                return type === DataType.OXYGEN ? number[currentIndex] === "1" : number[currentIndex] === "0";
            }
            else if (amountZero > amountOne) {
                return type === DataType.OXYGEN ? number[currentIndex] === "0" : number[currentIndex] === "1";
            }
            else {
                return type === DataType.OXYGEN ? number[currentIndex] === "1" : number[currentIndex] === "0";
            }
        });
        currentIndex++;
        amountZero = 0;
        amountOne = 0;
    }
    console.log(currentData);
    currentData = [];
    currentIndex = 0;
};
getResult(DataType.OXYGEN); // 573
getResult(DataType.CO2); // 2902
