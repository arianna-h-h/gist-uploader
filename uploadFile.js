const axios = require('axios');
require('dotenv').config();

const API_URL = 'https://api.github.com/gists';

/** The uploadFile function makes an AXIOS post request to github's API
 * to post a new gist.
 * @param {string} content - Contents of file from readFile
 * @param {string} gist - Name of gist supplied by user
 * @returns {Promise} - If resolved, returns a Promise with new gist's web address.
 * If rejected, returns a Promise with error message from github's API.
 */

async function uploadFile(content, gist) {
  if (!gist || !content) {
    throw new Error('You must provide a file and a name.');
  } else if (typeof content !== 'string') {
    throw new Error('Your file must contain a string.');
  } else if (typeof gist !== 'string') {
    throw new Error('Your gist name must be a string.');
  }
  return axios({
    method: 'post',
    url: API_URL,
    auth: {
      user: process.env.USER,
      password: process.env.SECRET_TOKEN,
    },
    data: { files: { [gist]: { content } } },
  });
}

module.exports = uploadFile;
