const readFile = require('./readFile.js');
const uploadFile = require('./uploadFile.js');

async function Runner(args) {
  try {
    if (undefined === args || !args[0]) {
      throw new Error('REQUIRED: filename and extension.');
    } else {
      const gistName = 'gistName';
      const content = await readFile(args.toString());
      if (content.message !== 'Couldn\'t find that file or directory.') {
        const response = await uploadFile(content, gistName);
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
