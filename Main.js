const fs = require('fs');
const readFile = require('./readFile.js');
const uploadFile = require('./uploadFile.js');
const clearScreen = require('./clearScreen.js');
const flattenDir = require('./flattenDir.js');

async function Runner(args) {
  try {
    if (undefined === args || !args[0]) {
      throw new Error('REQUIRED: filename and extension.');
    } else if (!fs.existsSync(args)) {
      throw new Error('Couldn\'t find that file or directory.');
    } else {
      const serializedList = flattenDir(args);
      const filesToUpload = await readFile(serializedList);
      const response = await uploadFile(filesToUpload);
      return (response);
    }
  } catch (error) {
    return (Promise.resolve(error.message));
  }
}


async function Main() {
  const fileArg = process.argv.slice(2);
  const result = await Runner(fileArg);
  if (result.success !== true) {
    console.log(result);
  } else {
    clearScreen();
    console.log(`\nYour gist is done uploading.\nView it at: ${result.message}`);
  }
}

Main();

module.exports = Runner;
