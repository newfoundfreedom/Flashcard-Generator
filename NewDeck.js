// define and call module dependencies and global variables
const fs = require('fs'),
    chalk = require('chalk');

let cardCollection = './cardCollection.json';

// read the cardCollection.json file, converting
//  into a structured object, then add a top-level key (deck) and initialize
//  as an array to the object. Then convert it back to a string and
//  re-write to cardCollections file
function NewDeck(newDeckName) {
    fs.readFile(cardCollection, function (err, data) { //read JSON file
        if (err) {
            throw err;
        } else {
            let decks = JSON.parse(data);  // format cardCollections
            decks[newDeckName] = [];  // add new deck property and initialize as an array
            decksFormatted = JSON.stringify(decks); // convert it back to long string
            fs.writeFile(cardCollection, decksFormatted, function (err) { // re-write to .json
                if (err) {
                    throw err;
                } else {
                    console.log(chalk.green(` >> The ${newDeckName} Deck has been successfully added.\n`));
                }
            }); // write it back
        }
    });
}

module.exports = NewDeck;