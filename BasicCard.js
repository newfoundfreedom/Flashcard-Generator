// BasicCard constructor which accepts a question and answer
//   and contains front and back methods
var BasicCard = function (question, answer) {
    this.front = question;
    this.back = answer;
};

// make the BasicCard constructor available
module.exports = BasicCard;
