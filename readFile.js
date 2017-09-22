const fileSystem = require('fs');
const readLine = require('readline');

/** The progressBar function calculates the length of the progress bar.
  * @param{number} percent - percentage of file already read.
  * @return{number} - number of characters the progress bar should fill.
  */
function progressBar(percent) {
  const BAR_LENGTH = 30;
  return Math.round((((BAR_LENGTH * percent) / 100)));
}

/** The percentRead function calculates the precentage of the file(s) that has been read.
  * @param{number} length - length of contents that have been read in bytes.
  * @param{number} size - total size of file(s) to be read bytes.
  * @return{number} - percent of file(s) read.
  */
function percentRead(length, size) {
  return (Math.round((length / size) * 100));
}

/** The readFile function accepts files and reads them.
  * @param{array} filesToUpload - An array of string objects, each with the following:
  * {{name: fileName }, {content: null}}
  * @return{Promise} - If resolved, returns the data in each file as an array
  * of string objects, where each object has the following structure:
  * { fileName: {content: contentofFile}}
  * If rejected, returns an error message.
  */
async function readFile(filesToUpload) {
  const PROG_BAR = '=';
  const totalSize = filesToUpload.reduce((size, fileName) => (
    size + fileSystem.statSync(fileName.name).size
  ), 0);
  console.log(`Total size: ${totalSize}\nUpload progress:`);
  const promises = filesToUpload.map((file) => {
    let finalContents = '';
    return new Promise((resolve, reject) => {
      try {
        const readStream = fileSystem.createReadStream(file.name);
        readStream.on('data', (chunk) => {
          finalContents += chunk;
          const percent = percentRead(finalContents.length, totalSize);
          const prog = progressBar(percent);
          readLine.cursorTo(process.stdout, 0);
          readLine.clearLine(process.stdout, 0);
          process.stdout.write(`|${PROG_BAR.repeat(prog)}>${percent}%`);
        });
        readStream.on('close', () => {
          const nameFormatted = file.name.replace(/[/]/, '-');
          resolve({ [nameFormatted]: { content: finalContents } });
        });
      } catch (error) {
        reject(error);
      }
    });
  });
  return Promise.all(promises);
}

module.exports = readFile;
