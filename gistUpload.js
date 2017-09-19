const axios = require('axios');
const fileSystem = require('fs');
require('dotenv').config();

const API_URL = 'https://api.github.com/gists';
let finalString = '';
const PROG_BAR = '=';
const BAR_LENGTH = 30;
const HANG_PERCENT = 0.25;


/** This is a description of the uploadFile function
 * @param {string} content - Contents of file from readFile
 * @param {string} gist - Name of gist supplied by user
 */
function uploadFile(content, gist) {
  return axios({
    method: 'post',
    url: API_URL,
    auth: {
      user: process.env.USER,
      password: process.env.SECRET_TOKEN,
    },
    data: { files: { [gist]: { content } } },
  })
    .then((response) => {
      console.log(`\nYour gist is done uploading.\nView it at: ${response.data.html_url}`);
      return (response.data.html_url);
    })
    .catch(error => (console.log(error.response.data)));
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
