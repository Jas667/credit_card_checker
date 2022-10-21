//Codecademy Javascript project creating functions to check for valid/invalid credit card numbers, as well as a function to change invalid credit card numbers into valid card numbers

// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// Add your functions below:

//function to check if a credit card is valid using Luhn algorithm. Credit card will be input as an array and checked. Original array should not be changed
const validateCard = (arr) => {
    let total = 0;
    // add every second digit doubled to total, working from 2nd last digit backwards
    for (let i = arr.length - 2; i >= 0; i-=2) {
        if ((arr[i] * 2) < 9) {
            total += arr[i] * 2;
        } else {
            total += (arr[i] * 2) - 9;
        }

    }

    //add the remaining digits to total so we can then work out if it is a valid card number
    for (let i = arr.length - 1; i >= 0; i-=2) {
        total += arr[i];

    }
    //check for valid card using modulo on total and return true if valid, false if invalid
    if (total % 10 === 0) {
        return true;
    } else {
        return false;
    }
}

//function to find invalid cards from a nested array and return another nested array of the invalid cards
const findInvalidCards = arr => {
    let invalidCardArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (validateCard(arr[i]) === false) {
            invalidCardArr.push(arr[i]);
        }
    }
    return invalidCardArr;
}

//function to determine which card companies are issuing the faulty cards. Should accept nested array
const invalidCardCompanies = (arr) => {
    let invalidArr = findInvalidCards(arr);
    let companyNames = [];
    
    for (let i = 0; i < invalidArr.length; i++) {
        if (companyNames.indexOf(invalidArr[i][0]) === -1) {
            companyNames.push(invalidArr[i][0])
        }
    }
    //convert companyNames to names rather than numbers
    for (let i = 0; i < companyNames.length; i++) {
        if (companyNames[i] === 3) {
            companyNames[i] = 'Amex (American Express)';
        } else if (companyNames[i] === 4) {
            companyNames[i] = 'Visa';
        } else if (companyNames[i] === 5) {
            companyNames[i] = 'Mastercard';
        } else if (companyNames[i] === 6) {
            companyNames[i] = 'Discover';
        } else {
            companyNames[i] = 'Company not found';
        }
    }
    return companyNames;
}


console.log(invalidCardCompanies(batch));

//function to convert credit card number as a string into a numbered array
const convertString = (str) => {
    let cardNumber = [];
    for (let i = 0; i < str.length; i++) {
        cardNumber.push(parseInt(str[i]));
    }
    return cardNumber;    
}


//function to convert invalid card into a valid card. It will then check the new number is valid at the end by running the new array through validate card. It will return true if valid, as well as the new card number

const cardConverter = (arr) => {
    let total = 0;
    let newNum =  0;
    let valid;
    // add every second digit doubled to total, working from 2nd last digit backwards
    for (let i = arr.length - 2; i >= 0; i-=2) {
        if ((arr[i] * 2) < 9) {
            total += arr[i] * 2;
        } else {
            total += (arr[i] * 2) - 9;
        }

    }

    //add the remaining digits to total so we can then work out if it is a valid card number
    for (let i = arr.length - 1; i >= 0; i-=2) {
        total += arr[i];

    }
    if (total % 10 === 0) {
        //if card is valid, ask for an invalid number to check
        return `This card is valid. Please input an invalid card to continue.`;
    } else {
        //find the leftover value making the card number invalid
        let remainder = total % 10;
        if (remainder <= arr[arr.length - 1]) {
            newNum = arr[arr.length - 1] - remainder;
        } else {
            newNum = remainder - arr[arr.length - 1];
        }
    }
    //change last digit of card to make it valid
    arr[arr.length - 1] = newNum;
    valid = validateCard(arr);

    //return new card number array
    return arr;
}

console.log(cardConverter(valid1));
console.log(cardConverter(invalid2));
