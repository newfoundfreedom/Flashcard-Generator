const fs = require('fs'),
    chalk = require('chalk'),
    inquirer = require('inquirer');
  const  mainMenu = require('./main.js');

let cardCollection = './cardCollection.json';

console.reset = function () {
    return process.stdout.write('\033c');
};

function TakeQuiz(deck) {
    fs.readFile(cardCollection, function (err, data) {
        if (err) {
            throw err;
        } else {
            let cards = JSON.parse(data),
                questions = cards[deck],
                questionTotal = (questions.length),
                count = 0,
                questionsCorrect = 0;

            let askQuestion = function (count) {
                if (count < questionTotal) {
                    inquirer.prompt([
                        {
                            message: questions[count].front,
                            name: 'response'
                        }
                    ]).then(function (data) {
                        if (data.response.toLowerCase() === questions[count].back.toLowerCase()) {
                            console.log(chalk.green(` >> That is correct!\n`));
                            questionsCorrect++;
                        } else {
                            console.log(chalk.red(` >> I'm sorry, the correct answer is ${questions[count].back}.\n`));
                        }
                        count++;
                        askQuestion(count)
                    });
                } else {
                    if (questionsCorrect >= (questionTotal / 2)) {
                        console.reset();
                        console.log(`\n QUIZ RESULTS\n`);
                        console.log(chalk.green (`   >> Congratulations, you got ${questionsCorrect} question(s) out of ${questionTotal} correct.  Great Job!!`));
                        console.log(`\n ....................................................................................................\n\n`)
                    } else {
                        console.reset();
                        console.log(`\n QUIZ RESULTS\n`);
                        console.log(chalk.red (`   >> You may want to go study up on ${deck} some more.  You got ${questionsCorrect} question(s) out of ${questionTotal} correct.`));
                        console.log(`\n ....................................................................................................\n\n`)
                    }
                }
            }; // end askQuestion function definition
            console.reset();
            askQuestion(count);

        } // end else (successful file read)
    }) //end readFile
} //end TakeQuiz

module.exports = TakeQuiz;
