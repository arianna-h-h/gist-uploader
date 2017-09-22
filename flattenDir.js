const fs = require('fs');
const flatmap = require('lodash.flatmap');


/** The flatHelper function is passed into flattenDir
  * as the helper function to lodash.flatmap.
  * @param {object} arg - process.argv that is a file or directory name.
  * @return {array} - returns file names as objects and returns directories
  * as an array of files within tha directory.
  */
function flatHelper(arg) {
  const stats = fs.statSync(arg);
  if (stats.isFile()) {
    return { name: arg };
  }
  return fs.readdirSync(arg).map(fileFromDir => (
    { name: `${arg}/${fileFromDir}` }));
}

/** The flattenDir function flattens directories into
  * a list of files.
  * @param {string} objectList - file or directory path.
  * @return {array} - returns flattened array of file names as
  * objects like: { name: fileName }, { name: dirName/fileName }...
  */
function flattenDir(objectList) {
  return flatmap(objectList, flatHelper);
}

module.exports = flattenDir;
