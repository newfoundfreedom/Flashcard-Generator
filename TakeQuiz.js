// define and call module dependencies and global variables
const fs = require('fs'),
    chalk = require('chalk'),
    inquirer = require('inquirer');

let cardCollection = './cardCollection.json';

// function to clear the current CLI screen
console.reset = function () {
    return process.stdout.write('\033c');
};

// function which accepts the user specified deck as an argument. Reads the
//  cardCollection.json file and formats it as an object.
function TakeQuiz(deck) {
    fs.readFile(cardCollection, function (err, data) {
        if (err) {
            throw err;
        } else {
            let cards = JSON.parse(data),
                questions = cards[deck], // variable to hold questions from user specified deck
                questionTotal = (questions.length), // num of questions in deck
                count = 0, // counter to keep track of which question count
                questionsCorrect = 0; // variable to capture num of correct answers

            // loop through all questions in deck, presenting question and capturing user response
            //  utilizing inquirer.
            let askQuestion = function (count) {
                if (count < questionTotal) {
                    inquirer.prompt([
                        {
                            message: questions[count].front,
                            name: 'response'
                        }
                    ]).then(function (data) {
                        //comparre user response to answer value - alert user either way
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
                    // Evaluate if the user got half the answers correct or not. Alert them either way- presenting the number correct.
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
