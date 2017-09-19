const fs = require('fs');
const { readFile } = require('./readFile.js');
const { uploadFile } = require('./uploadFile.js');
const { isFile } = require('./isFile.js');

const contentAndNameList = process.argv;
const objectList = [];
const serializedList = [];

async function Runner() {
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
  await uploadFile(filesToUpload);
}

Runner();
