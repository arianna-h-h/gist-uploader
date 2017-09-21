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
  } else if (typeof contents !== 'string') {
    throw new Error('Your file must contain a string.');
  } else if (typeof gist !== 'string') {
    throw new Error('Your gist name must be a string.');
  }
  const post = { [gist]: { content: contents } };
  const response = await axios.post(
    API_URL,
    { files: post },
  );
  console.log(`\nYour gist is done uploading.\nView it at: ${response.data.html_url}`);
  return (response.data.html_url);
}

module.exports = uploadFile;
