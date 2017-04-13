const fs = require('fs');

// read the cardDecks file converting
//  into a JSON object, then add a top-level key and initialize
//  as an array to the object, convert it back to a string and
//  write to cardDecks file
function NewDeck(newDeckName) {
    fs.readFile('./cardDecks.json', function (err, data) { //read JSON file
        if (err) {
            throw err;
        } else {
            let decks = JSON.parse(data);  // turn cardDecks into a local object
            decks[newDeckName] = [];  // add new deck property and initialize as an array
            decksFormatted = JSON.stringify(decks); //convert it back to json
            fs.writeFile('./cardDecks.json', decksFormatted, function (err) {
                if (err) {
                    throw err;
                } else {
                    console.log(`The ${newDeckName} Deck has been successfully added.`)
                }
            }); // write it back
        }
    });
};

module.exports = NewDeck;