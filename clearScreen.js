const readLine = require('readline');

/** The clearScreen function clears the progress bar. */
function clearScreen() {
  readLine.moveCursor(process.stdout, 0, -4);
  readLine.clearScreenDown(process.stdout);
}

module.exports = clearScreen;
