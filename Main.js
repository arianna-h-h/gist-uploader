const readFile = require('./readFile.js');
const uploadFile = require('./uploadFile.js');

async function Runner(args) {
  try {
    if (undefined === args || !args[0]) {
      throw new Error('REQUIRED: filename and extension.');
    } else {
      const gistName = 'gistName';
      const content = await readFile(args.toString());
      if (content.message !== 'Couldn\'t find that file or directory.') {
        const response = await uploadFile(content, gistName);
        return (response);
      }
    }
  } catch (error) {
    return (Promise.resolve(error.message));
  }
}

function flattenDirectory(path) {} // return flattened array of filenames


function progressBar(percentage) {
  return // formatted progressBar
}

function displayProgressBar(totalSize, bytesRead) {
  console.log(progressBar(bytesRead / totalSize));
}

// returns nested object containing { [filename]: contentsOfFile }
function readFile(gistContents, path, displayProgressBar) {
  // const contents = fs.readFileSync(path)
  // some error handling
  // return Object.assign({}, gistContents, { [path]: contents })
}

function uploadGist(gist) {} // returns gist url

function displayError(message) {}

if (require.main === module) {
  const paths = process.argv.slice(2); => Array
  if (paths.length === 0) {
    throw new Error('Please pass a path to a file or directory');
  }

  // parse filenames
  const flattenedPaths = flatMap(paths, flattenDirectory(path));

  // extract content from the files into payload
  const gists = flattenedPaths.reduce(readFile(gistContents, path, progressBar), {});

  // post to gist api
  try {
    const url = await uploadGist(gist);
    displaySuccess(url);
  } catch (error) {
    const message = error.message;
    displayError(message);
  }
}

Main();

module.exports = Runner;
