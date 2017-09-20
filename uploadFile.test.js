const uploadFile = require('./uploadFile.js');
const axios = require('axios');

const mockResponse = { data: { html_url: 'string' } };

describe('When given a string contents and a string gist', () => {
  it('Uploads file to github api as a gist', () => {
    axios.post = jest.fn(() => Promise.resolve(mockResponse));
    uploadFile('hello', 'helloName')
      .then((result) => { expect(result).toEqual({ message: 'string', success: true }); });
  });
});

describe('When invalid fields are sent', () => {
  it('Returns error status code 422', () => {
    axios.post = jest.fn(() => Promise.reject({ response: { status: '422' } }));
    uploadFile('hello', 'helloName')
      .then((result) => { expect(result).toEqual({ message: '422', success: false }); });
  });
});

describe('When API limits are reached', () => {
  it('Returns error status code 403', () => {
    axios.post = jest.fn(() => Promise.reject({ response: { status: '403' } }));
    uploadFile('hello', 'helloName')
      .then((result) => { expect(result).toEqual({ message: '403', success: false }); });
  });
});

describe('When invalid JSON is sent', () => {
  it('Returns error status code 400', () => {
    axios.post = jest.fn(() => Promise.reject({ response: { status: '400' } }));
    uploadFile('hello', 'helloName')
      .then((result) => { expect(result).toEqual({ message: '400', success: false }); });
  });
});
