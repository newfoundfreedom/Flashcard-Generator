const fs = require('fs');

// ClozeCard constructor accepts 'text' and 'cloze' arguments.  'text' argument
//   is the question to be asked, and 'cloze' represents the cloze-deleted
//   portion of text
const ClozeCard = function (deck, text, cloze) {
    this.fullText = text;
    this.cloze = cloze;

// create 'partial' method for the ClozeCard constructor which firstly determines
//    if the cloze text is contained within the full text.  If so, then a
//    the question is returned with '...' in place of the clozed portion
    ClozeCard.prototype.partial = function () {
        if (this.fullText.includes(this.cloze)) {
            return this.fullText.replace(this.cloze, '...');
        } else {
            let errMessage = '\n >> The cloze text "' + this.cloze + '" does not appear ' +
                'within the Question. Please try again.';
            fs.appendFile('error_log.txt', errMessage, errCB);
            return errMessage;
        }
    };
    // error call back
    function errCB() {
        console.log(' >> This error has been recorded in the error_log.')
    }


    fs.readFile('./cardDecks.json', function (err, data) {
        if (err) {
            throw err;
        } else {
            let decks = JSON.parse(data);
            decks[deck].push({"question": question, "answer": answer});
            decksFormatted = JSON.stringify(decks);
            fs.writeFile('./cardDecks.json', decksFormatted, function (err) {
                if (err) {
                    throw err;
                } else {
                    console.log(`Your question has been successfully added to the ${deck}.`)
                }
            }); // write it back
        }
    });
};

// make the ClozeCard constructor available
module.exports = ClozeCard;
