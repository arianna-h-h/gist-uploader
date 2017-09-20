const fs = require('fs');
const readLine = require('readline');
const { readFile } = require('./readFile.js');
const { uploadFile } = require('./uploadFile.js');
const { isFile } = require('./isFile.js');

async function Runner() {
  const contentAndNameList = process.argv;
  const objectList = [];
  const serializedList = [];

  for (let i = 2; i < contentAndNameList.length; i += 2) {
    objectList.push({ name: contentAndNameList[i + 1], content: contentAndNameList[i] });
  }
  objectList.forEach((item) => {
    if (isFile(item.content)) {
      serializedList.push(item);
    } else {
      fs.readdirSync(item.content).forEach(fileFromDir =>
        serializedList.push({
          name: `${item.name}-${fileFromDir}`,
          content: `${item.content}/${fileFromDir}`,
        }));
    }
  });

  const filesToUpload = await readFile(serializedList);
  let response = await uploadFile(filesToUpload);
  if (response === 'ENOTFOUND') {
    console.log('There was a network error.\nHit [ENTER] to try again.');
    const rl = readLine.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.on('line', (async () => {
        rl.close();
        response = await uploadFile(filesToUpload);
        console.log(response);
      }
    ));
  }
}

Runner();
