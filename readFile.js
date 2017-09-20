const fileSystem = require('fs');

const PROG_BAR = '=';
const BAR_LENGTH = 30;
const HANG_PERCENT = 0.25;

/** The readFile function accepts files and reads them
  * @param{string} fileToContent - A filename like example.txt
  * @return{Promise} - If resolved, returns the data in the file as a string.
  * If rejected, returns an error message.
  */

async function readFile(fileToContent) {
  try {
    let finalString = '';
    const totalSize = fileSystem.statSync(fileToContent).size;
    console.log(`Total size: ${totalSize}\nUpload progress:`);
    const readStream = fileSystem.createReadStream(fileToContent);
    return new Promise((resolve, reject) => {
      try {
        readStream.on('data', (chunk) => {
          finalString += chunk;
          const prog = ((chunk.length / totalSize) * BAR_LENGTH);
          process.stdout.write(`${PROG_BAR.repeat(Math.round(prog - HANG_PERCENT))}`);
        });
        readStream.on('close', () => {
          resolve(finalString);
        });
      } catch (error) {
        reject(error);
      }
    }).then(promise => Promise.resolve(promise));
  } catch (error) {
    if (error.code === 'ENOENT') {
      return Promise.reject(new Error('Couldn\'t find that file or directory.'));
    }
    return Promise.reject(error.message);
  }
}

module.exports = readFile;
