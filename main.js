// module dependency loading
const TakeQuiz = require('./TakeQuiz'),
    NewDeck = require('./NewDeck'),
    BasicCard = require('./BasicCard'),
    ClozeCard = require('./ClozeCard'),

    fs = require('fs'),
    inquirer = require('inquirer'),
    chalk = require('chalk'),
    cardDecks = require('./cardDecks.json');

// Create an array of all available card decks
// let decks = JSON.parse(data);
let deckOptions = Object.keys(cardDecks);

// user interface - prompt to select an option
inquirer.prompt([
    {
        type: 'list',
        message: 'Select Command',
        choices: ['Take a Quiz', 'Create a New Deck', 'Create a Basic Card', 'Create a Cloze Card'],
        name: 'choice'
    }
]).then(function (data) {
    switch (data.choice) {

        // if user chose to take a quiz - prompt to select from one of the
        //    available cardDecks, then run Quiz function
        case 'Take a Quiz':
            inquirer.prompt([
                {
                    type: 'list',
                    message: 'Choose which deck you would like to add to: ',
                    choices: deckOptions,
                    name: 'deckName'
                }
            ]).then(function (data) {
                TakeQuiz(data.deckName);
            });
            break;


        // If user chose to Create a New Deck: prompt for the deck Name and
        //  add a top level key to the cardDecks JSON file
        case 'Create a New Deck':
            inquirer.prompt([
                {
                    message: 'New Deck Title: ',
                    name: 'deckTitle'
                }
            ]).then(function (data) {
                // call the NewDeck constructor and supply the deck title to it
                new NewDeck(data.deckTitle);
            });
            break;


        // If user chose to create a Basic Card:  first prompt for which card
        //  deck to add it. Then prompt for a question to display on card front,
        //  and answer on card back. Finally invoke the BasicCard constructor
        //  passing in both the question and answer.
        case 'Create a Basic Card':
            inquirer.prompt([
                {
                    type: 'list',
                    message: 'Choose which deck you would like to add to: ',
                    choices: deckOptions,
                    name: 'deckName'
                }
            ]).then(function (data) {
                let deckName = data.deckName;
                console.log(`\nBASIC CARD Creation for ${deckName} ----------------------------------------\n`);
                inquirer.prompt([
                    {
                        type: 'input',
                        message: 'Front of Card - Question: ',
                        name: 'bcFront'
                    }, {
                        type: 'input',
                        message: 'Back of Card - Answer: ',
                        name: 'bcBack'
                    }
                ]).then(function (data) {
                    new BasicCard(deckName, data.bcFront, data.bcBack);
                });
            });
            break;


            case 'Create a Cloze Card':
            inquirer.prompt([
                {
                    type: 'list',
                    message: 'Choose which deck you would like to add to: ',
                    choices: deckOptions,
                    name: 'deckName'
                }
            ]).then(function (data) {
                let deckName = data.deckName;
                console.log(`\nBASIC CARD Creation for ${deckName} ----------------------------------------\n`);
                inquirer.prompt([
                    {
                        type: 'input',
                        message: 'What is the full question text: ',
                        name: 'fullText'
                    }, {
                        type: 'input',
                        message: 'What text from the above question would you like to cloze (obscure): ',
                        name: 'cloze'
                    }
                ]).then(function (data) {
                    new ClozeCard(deckName, data.bcFront, data.bcBack);
                });
            });
            break;
    }
});


