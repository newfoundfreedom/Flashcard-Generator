// module dependency require statments
const cardDecks = require('./cardDeckStorage'),
    BasicCard = require('./BasicCard'),
    ClozeCard = require('./ClozeCard'),
    TakeQuiz = require('./TakeQuiz'),
    inquirer = require('inquirer');


// user interface - prompt to select an option
inquirer.prompt([
    {
        type: 'list',
        message: 'Select Command',
        choices: ['Take a Quiz', 'Create a Basic Card', 'Create a Cloze Card'],
        name: 'choice'
    }
]).then(function (data) {
    switch (data.choice) {
        // if user chose to take a quiz - prompt them to select from one of the
        //    available quizzes
        case 'Take a Quiz':
            TakeQuiz();
            break;
        // if user chose to create a basic card - first prompt them which card
        //  deck they would like to add it to, then prompt them to supply a
        //  question for the front and an answer for the back finally, invoke
        //  the BasicCard constructor supplying it with deck question, and
        //  answer
        case 'Create a Basic Card':
            inquirer.prompt ([
                {
                    type: 'list',
                    message: 'Choose which deck you would like to add to: ',
                    choices: Object.keys(cardDecks),
                    name: 'deckName'
                }
            ]).then(function (data) {
                let deckName = data.deckName;
                console.log(cardDecks[deckName].q1.question);
            });
//             console.log('Basic Card Creation ----------------------------------------');
//             inquirer.prompt([
//                 {
//                     type: 'input',
//                     message: 'Front of Card - Question: ',
//                     name: 'bcFront'
//                 }, {
//                     type: 'input',
//                     message: 'Back of Card - Answer: ',
//                     name: 'bcBack'
//                 }
//             ]).then(function (data) {
//                 BasicCard(data.bcFront, data.bcBack);
//                 // console.log(data.bcFront);
//                 // console.log(data.bcBack);
//             });
            break;
        case
        'Create a Cloze Card'
        :
            ClozeCard();
//Statements executed when the result of expression matches valueN
            break;
    }
})
;


// let test = new ClozeCard('Joel is the dad in the Robert\'s house.', 'Joel');
// console.log(test.partial());

