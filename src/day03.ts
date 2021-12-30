import fs from 'fs';

const data = fs.readFileSync('dist/data/day03.txt', 'utf-8').split(/\r\n|\n\r|\n|\r/);

const dataFiltered = data.map((numbers:string)=> numbers.split(''))

// PART ONE
const gamma: string[] = [];
const epsilon: string[] = [];

type CommonsNumberClass= {
    zero: number;
    one: number;
}

const arrayLength = dataFiltered[0].length

const bitMostCommonNumbers: CommonsNumberClass[] = Array.from({length: arrayLength}, () => ({zero: 0, one: 0}))

dataFiltered.map((number: string[])=> number.map((number: string, i: number)=> number === '0' ? 
    bitMostCommonNumbers[i].zero++
    : 
    bitMostCommonNumbers[i].one++
    ))

bitMostCommonNumbers.map(data=> data.zero > data.one ? gamma.push("0") && epsilon.push("1") : gamma.push("1") && epsilon.push("0"))

const result = parseInt(gamma.toString().replace(/,/g, ''), 2) * parseInt(epsilon.toString().replace(/,/g, ''), 2)

console.log(result)

// PART TWO

enum DataType  {
    OXYGEN = "oxygen",
    CO2 = "co2"
}

const getResult = (type: DataType) => {

    let amountZero = 0;
    let amountOne = 0;
    let currentIndex = 0;

    let currentData = dataFiltered;

    while(currentIndex <= dataFiltered[0].length && currentData.length > 1) {

        currentData.map(number=> number[currentIndex] === "0" ? amountZero++ : amountOne++)

        currentData = currentData.filter(number=>{ 
            if(amountZero === amountOne) {
                return type === DataType.OXYGEN ? number[currentIndex] === "1" : number[currentIndex] === "0"
            } else if(amountZero > amountOne) {
                return type === DataType.OXYGEN ? number[currentIndex] === "0" : number[currentIndex] === "1"
            } else {
                return type === DataType.OXYGEN ? number[currentIndex] === "1" : number[currentIndex] === "0"
            }
        })

        currentIndex++
        amountZero = 0
        amountOne = 0
    }
    
    console.log(currentData)
    currentData = []
    currentIndex = 0
}

getResult(DataType.OXYGEN) // 573
getResult(DataType.CO2) // 2902