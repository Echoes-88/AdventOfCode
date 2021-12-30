import fs from 'fs';

let amountIncrease = 0;
const data: number[] = fs.readFileSync('dist/data/day01.txt', 'utf-8').split(/\r\n|\n\r|\n|\r/).map(amount=> parseInt(amount));

    // 1
    data.forEach((amount, i)=> i > 0 && i < data.length && amount < data[i+1] && amountIncrease++)

    // 2
    let arrayOfSum: number[] = [];
    data.forEach((amount, i)=> {
        i>0 && i < data.length-2 && arrayOfSum.push(amount+data[i+1]+data[i+2])
    })
    arrayOfSum.forEach((amount, i)=> amount < arrayOfSum[i+1] && amountIncrease++)

    // output
    console.log(amountIncrease)