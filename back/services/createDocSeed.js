const fs = require('fs');
const parsepdf = require('./parsepdf');

const createDocSeed = async (Doc, name, url, data) => {
  const dataBuffer = data ? data : fs.readFileSync(url)
  const content = await parsepdf(dataBuffer);
  const doc = {
    name,
    extension: 'pdf',
    content,
    url,
  }
  await Doc.create(doc);
}

module.exports = createDocSeed;
 
