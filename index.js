const readlineSync = require('readline-sync');
const fs = require('fs');
const path = require('path');
const folderPath = './questions';

const filesArr = fs.readdirSync(folderPath); //массив файлов из папки
//console.log(filesArr);
// Выбираем случайные вопросы
function getRandNumQuestions(filesArr) {
  let questions = [];
  while(questions.length < 5){
    let randNum = Math.floor(Math.random() * filesArr.length);
    if(!(questions.includes(filesArr[randNum]))){
      questions.push(filesArr[randNum]);
    }
  }
  return questions;
}
console.log(getRandNumQuestions(filesArr));
// Формируем объект (вопрос,правельный ответ,варианты ответов)
function getQuestion(question){
  let data = {};
  const position = question.indexOf('Ответ');
  data.question = question.slice(0, position);
  data.rAnswer = question.slice(position);
  data.rAnswer = data.rAnswer.slice(0, data.rAnswer.indexOf('\n'));
  data.answers = question.slice(position+data.rAnswer.length);
  return data;
}
// Читаем данные из файла с вопросом, проверяем введенный ответ с правильным ответом, выдаем число правлеьных ответов
function chekAnswer(questions) {
  let count = 0;
  for(let question of questions){    
    try {
      const data = fs.readFileSync(path.resolve(folderPath, question), 'UTF-8');
      //console.log(getQuestion(data));
      console.log('\n' + getQuestion(data).question + getQuestion(data).answers);
      const answer = readlineSync.questionInt('Введите ответ: ');
      if(getQuestion(data).rAnswer.includes(answer)){
        count += 1;
      }
    } catch (err) {
    console.error(err);
    }
  }
  return count;
}
console.log('Правельных ответов: ' + chekAnswer(getRandNumQuestions(filesArr)));
