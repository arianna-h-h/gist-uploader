const fileSystem = require('fs');
const sleep = require('sleep');

const PROG_BAR = '=';
const BAR_LENGTH = 30;
const HANG_PERCENT = 0.25;

/** The readFile function accepts files and reads them
  * @param{string} fileToContent - A filename like example.txt
  * @return{Promise} - If resolved, returns the data in the file as a string.
  * If rejected, returns an error message.
  */

async function readFile(ArrayOfFiles) {
  let promiseArray = [];
  const totalSize = ArrayOfFiles.reduce((sum, file) => {
    return sum + fileSystem.statSync(file.content).size;
  }, 0);
  console.log(`Total size: ${totalSize}\nUpload progress:`);
  promiseArray = ArrayOfFiles.map((file) => {
    let finalString = '';
    return new Promise((resolve, reject) => {
      try {
        const readStream = fileSystem.createReadStream(file.content);
        readStream.on('data', (chunk) => {
          finalString += chunk;
          const prog = ((chunk.length / totalSize) * BAR_LENGTH);
          process.stdout.write(`${PROG_BAR.repeat(Math.round(prog - HANG_PERCENT))}`);
          sleep.msleep(200);
        });
        readStream.on('close', () => {
          resolve({ [file.name]: { content: finalString } });
        });
      } catch (error) {
        reject(error);
      }
    });
  });
  return Promise.all(promiseArray).then(value => value)
}


module.exports = { readFile };
