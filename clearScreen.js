const readLine = require('readline');

/** The clearScreen function clears the progress bar and outputs the gist URL.
  * @param{string} url - The URL of the new gist.
  */
function clearScreen() {
  readLine.moveCursor(process.stdout, 0, -4);
  readLine.clearScreenDown(process.stdout);
}

module.exports = { clearScreen };
