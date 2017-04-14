const fs = require('fs'),
    chalk = require('chalk');

let cardCollection = './cardCollection.json';

// ClozeCard constructor accepts 'fullText' and 'cloze' arguments.  'fullText' argument
//   is the question to be asked, and 'cloze' represents the cloze-deleted
//   portion of text
function ClozeCard(deck, fullText, cloze) {
    this.deck = deck;
    this.full = fullText;
    this.cloze = cloze;
}

// create 'partial' method for the ClozeCard constructor which firstly determines
//    if the cloze text is contained within the full text.  If so, then a
//    the question is returned with '...' in place of the clozed portion
ClozeCard.prototype.partial = function () {
    if (this.full.includes(this.cloze)) {
        let clozeSentence = this.full.replace(this.cloze, '...');
        return clozeSentence;
    } else {
        console.log(chalk.red(` >> Card creation failed. The word "${this.cloze}"` +
        ` was not found within the full fact statement.\n    Please try again.\n`));
        return false;
    }
};

// create 'addCard' method for the ClozeCard constructor writes the cloze card
//  to the cardCollection.json file
ClozeCard.prototype.addCard = function (clozeSentence) {
    let chosenDeck = this.deck,
        cardFront = clozeSentence,
        cardBack = this.cloze,
        cardFull = this.full;
    fs.readFile(cardCollection, function (err, data) {
        if (err) {
            throw err;
        } else {
            let cardCollections = JSON.parse(data);
            cardCollections[chosenDeck].push({
                "type": "cloze",
                "full": cardFull,
                "front": cardFront,
                "back": cardBack,
            });
            let cardCollectionsFormatted = JSON.stringify(cardCollections);
            fs.writeFile(cardCollection, cardCollectionsFormatted, function (err) {
                if (err) {
                    throw err;
                } else {
                    console.log(chalk.green(` >> Your Cloze Card has been successfully added to the ${chosenDeck} Deck.\n`));
                }
            }) // end writeFile
        } // end else
    }); // end read
}; // end ClozeCard.addCard method


// make the ClozeCard constructor available
module.exports = ClozeCard;

