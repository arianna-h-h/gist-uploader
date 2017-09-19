const axios = require('axios');

const API_URL = 'https://api.github.com/gists';

/** The uploadFile function makes an AXIOS post request to github's API
 * to post a new gist.
 * @param {string} contents - Contents of file from readFile
 * @param {string} gist - Name of gist supplied by user
 * @returns {Promise} - If resolved, returns a Promise with new gist's web address.
 * If rejected, returns a Promise with error message from github's API.
 */

function uploadFile(contents, gist) {
  const post = { [gist]: { content: contents } };
  return axios.post(
    API_URL,
    { files: post },
  )
    .then((response) => {
      console.log(`\n\nYour gist is done uploading.\nView it at: ${response.data.html_url}`);
      return (response.data.html_url);
    })
    .catch(error => (error.response.status));
}

module.exports = { uploadFile };
