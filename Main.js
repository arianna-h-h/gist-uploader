const readFile = require('./readFile.js');
const uploadFile = require('./uploadFile.js');
const clearScreen = require('./clearScreen.js');
const flattenDir = require('./flattenDir.js');

async function Runner() {
  const contentAndNameList = process.argv.slice(2);
  const serializedList = flattenDir(contentAndNameList);
  const filesToUpload = await readFile(serializedList);
  const response = await uploadFile(filesToUpload);
  await clearScreen();
  console.log(`\nYour gist is done uploading.\nView it at: ${response.data.html_url}`);
  return (response.data.html_url);
}

Runner();
