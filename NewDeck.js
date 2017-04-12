const fs = require('fs');

// read the cardDecks file converting
//  into a JSON object, then add a top-level key and initialize
//  as an array to the object, convert it back to a string and
//  write to cardDecks file
const NewDeck = function (newDeckName) {
    fs.readFile('./cardDecks.json', function (err, data) { //read JSON file
        if (err) {
            throw err;
        } else {
            // Verify that new deck name does not already exist
            // let existingDeks = Object.keys('./cardDecks.json');
            // if (existingDeks.includes(newDeckName)) {
            // if it already exists, alert user, otherise...
            // console.log(`${newDeckName} already exists. You must use a new Deck name.`)
            // } else {
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
    // });
// };

module.exports = NewDeck;