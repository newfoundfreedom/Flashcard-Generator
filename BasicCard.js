const fs = require('fs'),
    chalk = require('chalk');
let cardCollection = './cardCollection.json';

// BasicCard constructor which accepts 'question' and 'answer' arguments and
//   contains front and back methods
function BasicCard (deck, question, answer) {
    this.front = question;
    this.back = answer;

    fs.readFile(cardCollection, function (err, data) {
        if (err) {
            throw err;
        } else {
            let cards = JSON.parse(data);
            cards[deck].push({"type": "basic", "front": question, "back": answer});
            cardsFormatted = JSON.stringify(cards);
            fs.writeFile(cardCollection, cardsFormatted, function (err) {
                if (err) {
                    throw err;
                } else {
                    console.log(`  >> Your question has been successfully added to the ${deck} Deck.\n`)
                }
            }); // write it back
        }
    });
};

// make the BasicCard constructor available
module.exports = BasicCard;
