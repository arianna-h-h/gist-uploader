const axios = require('axios');

const API_URL = 'https://api.github.com/gists';

/** The uploadFile function makes an AXIOS post request to github's API
 * to post a new gist.
 * @param {string} contents - Contents of file from readFile
 * @param {string} gist - Name of gist supplied by user
 * @returns {Promise} - If resolved, returns a Promise with new gist's web address.
 * If rejected, returns a Promise with error message from github's API.
 */

async function uploadFile(contents, gist) {
  if (!gist || !contents) {
    throw new Error('You must provide a file and a name.');
  }
  const post = { [gist]: { content: contents } };
  try {
    const response = await axios.post(
      API_URL,
      { files: post },
    );
    console.log(`\nYour gist is done uploading.\nView it at: ${response.data.html_url}`);
    return ({ success: true, message: response.data.html_url }); // wrap in object
  } catch (error) {
    return ({ success: false, message: error.response.status });
  }
}


module.exports = { uploadFile };
