const readFile = require('./readFile.js');
const uploadFile = require('./uploadFile.js');
const { clearScreen } = require('./clearScreen.js');

const gistName = process.argv[3];
const file = process.argv[2];

async function Runner() {
  const content = await readFile(file);
  const response = await uploadFile(content, gistName);
  await clearScreen();
  console.log(`\nYour gist is done uploading.\nView it at: ${response.data.html_url}`);
  return (response.data.html_url);
}

Runner();
