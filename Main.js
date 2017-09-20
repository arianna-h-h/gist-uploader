const readFile = require('./readFile.js');
const uploadFile = require('./uploadFile.js');
const clearScreen = require('./clearScreen.js');
const flattenDir = require('./flattenDir.js');

async function Runner(args) {
  try {
    if (undefined === args || !args[0]) {
      throw new Error('REQUIRED: filename and extension.');
    } else {
      const serializedList = flattenDir(args);
      const filesToUpload = await readFile(serializedList);
      if (filesToUpload.message !== 'Couldn\'t find that file or directory.') {
        const response = await uploadFile(filesToUpload);
        await clearScreen();
        return (response);
      }
    }
  } catch (error) {
    return (Promise.resolve(error.message));
  }
}


async function Main() {
  const fileArg = process.argv.slice(2);
  const result = await Runner(fileArg);
  if (result.success !== true) {
    await console.log(result);
  }
}

Main();

module.exports = Runner;
