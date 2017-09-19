const fileSystem = require('fs');

const PROG_BAR = '=';
const BAR_LENGTH = 30;
const HANG_PERCENT = 0.25;

/** The readFile function accepts files and reads them
  * @param{string} fileToContent - A filename like example.txt
  * @return{Promise} - If resolved, returns the data in the file as a string.
  * If rejected, returns an error message.
  */
async function readFile(filesToUpload) {
  let promiseList = [];
  const totalSize = filesToUpload.reduce((size, fileName) => (
    size + fileSystem.statSync(fileName.content).size
  ), 0);

  console.log(`Total size: ${totalSize}\nUpload progress:`);
  promiseList = filesToUpload.map((file) => {
    let finalContents = '';
    return new Promise((resolve, reject) => {
      try {
        const readStream = fileSystem.createReadStream(file.content);
        readStream.on('data', (chunk) => {
          finalContents += chunk;
          const prog = ((chunk.length / totalSize) * BAR_LENGTH);
          process.stdout.write(`${PROG_BAR.repeat(Math.round(prog - HANG_PERCENT))}`);
        });
        readStream.on('close', () => {
          resolve({ [file.name]: { content: finalContents } });
        });
      } catch (error) {
        reject(error);
      }
    });
  });
  return Promise.all(promiseList).then(response => response);
}


module.exports = { readFile };
