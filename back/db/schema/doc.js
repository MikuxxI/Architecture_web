const mongoose = require('mongoose');
const { Schema } = mongoose;

const docSchema = new Schema({
  name: String, // String is shorthand for {type: String}
  content: String,
  extension: String,
  key: [String],
});

module.exports = mongoose.model('doc', docSchema);