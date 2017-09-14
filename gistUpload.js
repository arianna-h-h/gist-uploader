const axios = require('axios');
const fs = require('fs');

const API_URL = 'https://api.github.com/gists';

/** This is a description of the uploadFile function
 * @param {string} contents - Contents of file from readFile
 * @param {string} gist - Name of gist supplied by user
 */
function uploadFile(contents, gist) {
  const post = { [gist]: { content: contents } };
  return axios.post(
    API_URL,
    { files: post },
  )
    .then((response) => {
      console.log(response.data.html_url);
      return (response.data.html_url);
    })
    .catch(error => (error.response.status));
}

function readFile(fileToContent, gistToName) {
  fs.readFile(fileToContent, (error, contents) => (
    error ? console.log(error) : uploadFile(contents.toString(), gistToName)
  ));
}


module.exports = { uploadFile, readFile };
