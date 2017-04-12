const fs = require('fs');

// BasicCard constructor which accepts 'question' and 'answer' arguments and
//   contains front and back methods
const BasicCard = function (deck, question, answer) {
    this.front = question;
    this.back = answer;

    fs.readFile('./cardDecks.json', function (err, data) {
        if (err) {
            throw err;
        } else {
            let decks = JSON.parse(data);
            decks[deck].push({"front": question, "back": answer});
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

// make the BasicCard constructor available
module.exports = BasicCard;
