const mongoose = require('mongoose');
const { Schema } = mongoose;

const docSchema = new Schema({
  name: String, // String is shorthand for {type: String}
  url: String,
  content: String,
  extension: String,
});

module.exports = mongoose.model('doc', docSchema);