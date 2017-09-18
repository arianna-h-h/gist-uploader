const fs = require('fs');

function isFile(file) {
  const stats = fs.statSync(file);
  return stats.isFile();
}

module.exports = { isFile };
