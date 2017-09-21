const fileSystem = require('fs');
const readLine = require('readline');

const PROG_BAR = '=';
const BAR_LENGTH = 30;
const HANG_INCREMENT = 100;

/** The readFile function accepts files and reads them
  * @param{string} fileToContent - A filename like example.txt
  * @return{Promise} - If resolved, returns the data in the file as a string.
  * If rejected, returns an error message.
  */
function readFile(fileToContent) {
  let finalString = '';
  const totalSize = fileSystem.statSync(process.argv[2]).size;
  console.log(`Total size: ${totalSize}\nUpload progress:`);
  const readStream = fileSystem.createReadStream(fileToContent);
  return new Promise((resolve, reject) => {
    try {
      readStream.on('data', (chunk) => {
        finalString += chunk;
        const prog = (Math.round((finalString.length / totalSize) * BAR_LENGTH));
        const percent = (Math.round((prog / BAR_LENGTH) * HANG_INCREMENT));
        readLine.cursorTo(process.stdout, 0);
        readLine.clearLine(process.stdout, 0);
        process.stdout.write(`|${PROG_BAR.repeat(prog)}>${percent}%`);
      });
      readStream.on('close', () => {
        process.stdout.write('\nUploading...\n');
        resolve(finalString);
      });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = readFile;
