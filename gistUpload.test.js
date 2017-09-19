const { uploadFile } = require('./uploadFile.js');
const axios = require('axios');

const mockResponse = { data: { html_url: 'string' } };
const mockBadResponse = { response: { status: '422' } };

describe('When given a string contents and a string gist', () => {
  it('Uploads file to github api as a gist', () => {
    axios.post = jest.fn(() => Promise.resolve(mockResponse));
    uploadFile('hello', 'helloName')
      .then((result) => { expect(result).toBe('string'); });
  });
});

describe('When given no arguments', () => {
  it('Returns a 422 error code', () => {
    axios.post = jest.fn(() => Promise.reject(mockBadResponse));
    uploadFile('hello', 'helloName')
      .then((result) => { expect(result).toBe('422'); });
  });
});
