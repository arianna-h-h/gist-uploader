const gistUpload = require('./gistUpload.js');

const gistName = process.argv[3];
const file = process.argv[2];

function Runner() {
  gistUpload.readFile(file, gistName);
}

Runner();
