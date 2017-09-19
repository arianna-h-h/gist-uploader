const { readFile } = require('./readFile.js');
const { uploadFile } = require('./uploadFile.js');

const gistName = process.argv[3];
const file = process.argv[2];

async function Runner() {
  const content = await readFile(file);
  await uploadFile(content, gistName);
}

Runner();
