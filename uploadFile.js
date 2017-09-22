const axios = require('axios');
require('dotenv').config();

const API_URL = 'https://api.github.com/gists';

/** The uploadFile function makes an AXIOS post request to github's API
 * to post a new gist.
 * @param {Array} files - List of files and names to be uploaded.
 * @returns {Promise} - If resolved, returns a Promise with new gist's web address.
 * If rejected, returns a Promise with error message from github's API.
 */

async function uploadFile(files) {
  process.stdout.write('\nUploading...\n');
  const destructFiles = Object.assign({}, ...files);
  if (!files) {
    throw new Error('You must provide a files.');
  }
  const response = await axios({
    method: 'post',
    url: API_URL,
    auth: {
      user: process.env.USERNAME,
      password: process.env.SECRET_TOKEN,
    },
    data: { files: destructFiles },
  });
  return (response);
}

module.exports = uploadFile;
