const request = require('request');
const fs      = require('fs');
request('https://raw.githubusercontent.com/jonathantneal/google-fonts-complete/master/google-fonts.json').pipe(fs.createWriteStream('google-fonts.json'));
