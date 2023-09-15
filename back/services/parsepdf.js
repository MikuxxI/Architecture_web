const pdf = require('pdf-parse');
const fs = require('fs');

const parsepdf = async (dataBuffer) => {
    const data = await pdf(dataBuffer);
    return data.text;
}

module.exports = parsepdf;
 
