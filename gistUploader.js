
const axios = require('axios');

axios.post(
  'https://api.github.com/gists',
  {
    'files': { 'short.txt': { 'content': 'file contents' } },
  },
)
  .then(response => (console.log(response)))
  .catch(error => (console.log(error)));
