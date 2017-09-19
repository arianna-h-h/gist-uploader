const { readFile } = require('./readFile.js');
const { uploadFile } = require('./uploadFile.js');
const fs = require('fs');
const { isFile } = require('./isFile.js');

const gistName = process.argv[3];
const file = process.argv[2];

// async function Runner() {
//   const content = await readFile(file);
//   await uploadFile(content, gistName);
async function Runner() {
  const content = await readFile(file);
  await uploadFile(content, gistName);
  for (let i = 2; i < fileArgs.length; i = i + 2) {
    array.push({ name: fileArgs[i+1], content: fileArgs[i] });
  }
  for (let i = 0; i < array.length; i = i + 1) {
    if (isFile(array[i].content)) {
      fileArray.push(array[i]);
    } else {
      console.log('is directory');
      fs.readdirSync(array[i].content).forEach(fileFromDir =>
        fileArray.push({
          name: `${array[i].name}-${fileFromDir}`,
          content: `${array[i].content}/${fileFromDir}`
        }));
    } // by this point, I have array of file names to call read file on
  }
  console.log(fileArray);

  // I need to call readFile on all of the fileNames

  const contentArray = await readFile(fileArray);
  await uploadFile(contentArray);

  // // readFile will return array of objects with filename and contents
  // // I will pass that array into upload file (as the key/value pairs)
  // gistUpload.uploadFile(contentArray);
}


Runner();
