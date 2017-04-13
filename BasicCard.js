const fs = require('fs');

// BasicCard constructor which accepts 'question' and 'answer' arguments and
//   contains front and back methods
function BasicCard (deck, question, answer) {
    this.front = question;
    this.back = answer;

    fs.readFile('./cardDecks.json', function (err, data) {
        if (err) {
            throw err;
        } else {
            let decks = JSON.parse(data);
            decks[deck].push({"type": "basic", "front": question, "back": answer});
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
