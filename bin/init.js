var fs = require('fs'),
    path = require('path');

var writeFileIfExists = function(file, contents) {
  if (!fs.existsSync(path.join(process.cwd(), file))) {
    fs.writeFileSync(path.join(process.cwd(), file), contents);
    console.log('File ' + file.cyan + ' created.');
  } else {
    console.log('File ' + file.cyan + ' already exists.');
  }
};

module.exports = function() {
  fs.mkdirSync('lightcards');
  writeFileIfExists('lightcards/vocabulary.txt',
                    fs.readFileSync(path.join(__dirname, '../example-vocabulary.txt')));
  writeFileIfExists('lightcards/config.json',
                    fs.readFileSync(path.join(__dirname, '../default-config.json')));
  writeFileIfExists('lightcards/state.json', JSON.stringify([]));
  process.exit(0);
};
