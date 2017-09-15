const axios = require('axios');
const fileSystem = require('fs');

const API_URL = 'https://api.github.com/gists';
let finalString = '';
const PROG_BAR = '=';
const BAR_LENGTH = 30;
const HANG_PERCENT = 0.25;

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
      console.log(`\nYour gist is done uploading.\nView it at: ${response.data.html_url}`);
      return (response.data.html_url);
    })
    .catch(error => (error.response.status));
}

function addToFile(chunk) {
  finalString += chunk;
}

function readFile(fileToContent, gistToName) {
  const totalSize = fileSystem.statSync(process.argv[2]).size;
  console.log(`Total size: ${totalSize}\nUpload progress:`);
  const readStream = fileSystem.createReadStream(fileToContent);

  readStream.on('data', (chunk) => {
    try {
      addToFile(chunk);
      const prog = (Math.round((chunk.length / totalSize) * BAR_LENGTH));
      process.stdout.write(`${PROG_BAR.repeat(prog - HANG_PERCENT)}`);
    } catch (error) {
      throw new Error(error);
    }
  });

  readStream.on('close', () => {
    uploadFile(finalString, gistToName);
  });
}


module.exports = { readFile, uploadFile };
