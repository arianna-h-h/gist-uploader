const fileSystem = require('fs');

const PROG_BAR = '=';
const HANG_PERCENT = 0.25;

/** The progressBar function calculates the progress of the readStream.
  * @param{number} length - length in bytes of current chunk of data.
  * @param{number} size - total size in bytes of file(s) to be uploaded.
  * @return{number} - percentage bytes read of total bytes to read.
  */
function progressBar(length, size) {
  const BAR_LENGTH = 30;
  return ((length / size) * BAR_LENGTH);
}

/** The readFile function accepts files and reads them
  * @param{string} fileToContent - A filename like example.txt
  * @return{Promise} - If resolved, returns the data in the file as a string.
  * If rejected, returns an error message.
  */
async function readFile(filesToUpload) {
  const totalSize = filesToUpload.reduce((size, fileName) => (
    size + fileSystem.statSync(fileName.content).size
  ), 0);
  console.log(`Total size: ${totalSize}\nUpload progress:`);
  const promises = filesToUpload.map((file) => {
    let finalContents = '';
    return new Promise((resolve, reject) => {
      try {
        const readStream = fileSystem.createReadStream(file.content);
        readStream.on('data', (chunk) => {
          finalContents += chunk;
          const prog = progressBar(chunk.length, totalSize);
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
  return Promise.all(promises);
}


module.exports = { readFile };
