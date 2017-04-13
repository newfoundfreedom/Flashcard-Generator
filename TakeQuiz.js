const fs = require('fs'),
    chalk = require('chalk'),
    inquirer = require('inquirer');
let cardCollection = './cardCollection.json';

function TakeQuiz(deck) {
    fs.readFile(cardCollection, function (err, data) {
        if (err) {
            throw err;
        } else {
            let cards = JSON.parse(data),
                questions = (cards[deck]);
            console.log(questions);
//
//             let questionTotal = (questions.length);
//             let questionsCorrect = 0;
//
//             for (let obj in questions) {
//                 let question = questions[obj];
//                 if (question.type === 'basic') {
//                     console.log (question.front);
//                     console.log (question.back);
//                     inquirer.prompt([
//                         {
//                             message: question.front,
//                             name: 'response'
//                         }
//                     ]).then(function (data) {
//                         if (data.response === question.back) {
//                             console.log(' >> That is correct!');
//                             questionsCorrect++;
//                         } else {
//                             console.log(chalk.red(`  >> I'm sorry that was incorrect.` +
//                                 `The correct answer is "${card.back}"`));
//                         }
//                     });
//                 }
//                 if (question.type === 'cloze') {
//                     console.log(`This is a cloze card`);
//                 }
//             } // end else statement
        }
    }); // end read file
} //end TakeQuiz

module.exports = TakeQuiz;