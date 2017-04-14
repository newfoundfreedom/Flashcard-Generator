// define and call module dependencies and global variables
const fs = require('fs'),
    chalk = require('chalk');
let cardCollection = './cardCollection.json';

// BasicCard constructor which accepts 'question' and 'answer' arguments and
//   contains front and back methods
function BasicCard(deck, question, answer) {
    this.front = question;
    this.back = answer;

    // read teh cardCollection.json file. Format the data into an object. Add
    //  the new card based on the user input. Reformat data and push back to
    //  the cardCollection file.
    fs.readFile(cardCollection, function (err, data) {
        if (err) {
            throw err;
        } else {
            let cards = JSON.parse(data);
            cards[deck].push(
                {
                    "type": "basic",
                    "front": question,
                    "back": answer
                }
            );
            cardsFormatted = JSON.stringify(cards);
            fs.writeFile(cardCollection, cardsFormatted, function (err) {
                if (err) {
                    throw err;
                } else {
                    console.log(chalk.green(` >> Your question has been successfully added to the ${deck} Deck.\n`));
                }
            }); // write it back
        } // end else (no errors)
    }); // end readFile
}; // end BasicCard constructor

// make the BasicCard constructor available to other modules
module.exports = BasicCard;
