var fs = require('fs'),
    path = require('path'),
    browserify = require('browserify'),
    cardGenerator = require('./card-generator.js');

var script;
var cards;

exports.init = function(options) {
  // Write new cards file
  var vocabulary = fs.readFileSync(options.vocabularyFile, 'utf-8');
  cards = cardGenerator.generateCardsFromVocabulary(vocabulary);
  script = browserify(path.join(__dirname, 'lightcards/main.js'));
};

exports.pipe = function(stream) {
  script.bundle({
    insertGlobalVars: {
      cards: function() {
        return JSON.stringify(cards);
      }
    }
  }).pipe(stream);
};