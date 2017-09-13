
const axios = require('axios');
const fs = require('fs');

let data;

function processFile(fileToPost) {
  axios.post(
    'https://api.github.com/gists',
    {
      files: { 'short.txt': { content: fileToPost } },
    },
  )
    .then(response => (console.log(response)))
    .catch(error => (console.log(error)));
}

fs.readFile(process.argv[2], (error, contents) => {
  if (error) {
    console.log(error);
  }
  data = contents.toString();
  processFile(data);
});
