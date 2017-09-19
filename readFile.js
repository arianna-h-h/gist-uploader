const fileSystem = require('fs');

const PROG_BAR = '=';
const BAR_LENGTH = 30;
const HANG_PERCENT = 0.25;


function readFile(fileToContent) {
  let finalString;
  const totalSize = fileSystem.statSync(process.argv[2]).size;
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
  });
}

module.exports = { readFile };