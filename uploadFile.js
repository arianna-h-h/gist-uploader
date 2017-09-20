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
  const destructFiles = Object.assign({}, ...files);
  if (!files) {
    throw new Error('You must provide a files.');
  }
  try {
    const response = await axios({
      method: 'post',
      url: API_URL,
      auth: {
        user: process.env.USER,
        password: process.env.SECRET_TOKEN,
      },
      data: { files: destructFiles },
    });
    console.log(`\nYour gist is done uploading.\nView it at: ${response.data.html_url}`);
    return (response.data.html_url);
  } catch (error) {
    return (error.code);
  }
}

module.exports = { uploadFile };
