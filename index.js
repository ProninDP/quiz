const fs = require('fs');
const path = require('path');
const folderPath = './questions';

const filesArr = fs.readdirSync(folderPath);
console.log(filesArr);

function getRandQuestions(filesArr){
  let questions = [];
  while(questions.length < 5){
    let randNum = Math.floor(Math.random() * filesArr.length);
    if(!(questions.includes(filesArr[randNum]))){
      questions.push(filesArr[randNum]);
    }
  }
  return questions;
}
console.log(getRandQuestions(filesArr));

