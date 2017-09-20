const { uploadFile } = require('./uploadFile.js');
const axios = require('axios');

const mockResponse = { data: { html_url: 'string' } };

describe('When given a string contents and a string gist', () => {
  it('Uploads file to github api as a gist', () => {
    axios.post = jest.fn(() => Promise.resolve(mockResponse));
    uploadFile('hello', 'helloName')
      .then((result) => { expect(result).toBe('string'); });
  });
});

describe('When given no arguments or incorrect number of arguments', () => {
  it('Returns a new error message: you must provide a file and name.', () => {
    uploadFile()
      .catch((error) => {
        expect(error.message).toEqual('You must provide a files.');
      });
  });

  it('Returns a new error message: you must provide a file and name.', () => {
    uploadFile('hello')
      .catch((error) => {
        expect(error.message).toEqual('You must provide a files.');
      });
  });
});

describe('When given non-string arguments', () => {
  it('Returns the error: Your file must contain a string.', () => {
    uploadFile(1)
      .catch((error) => {
        expect(error.message).toEqual('You must provide a files.');
      });
  });

  it('Returns the error: Your gist name must be a string.', () => {
    uploadFile('hello', 2)
      .catch((error) => {
        expect(error.message).toEqual('You must provide a files.');
      });
  });
});
