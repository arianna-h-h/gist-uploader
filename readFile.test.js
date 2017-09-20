const readfile = require('./readFile.js');

const shortContents = 'Hello World!\n\nThis is a short text file!\n';

describe('When given a valid filename', () => {
  it('Reads file and returns a promise with that file\'s content', () => {
    readfile('exercises/short.txt')
      .then((result) => { expect(result).toBe(shortContents); });
  });
});

describe('When given an invalid filename', () => {
  it('Throws an error', () => {
    readfile('notvalid')
      .then((result) => { expect(result).toBe('[Error: Couldn\'t find that file or directory.]'); });
  });
});
