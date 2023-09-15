const mongoose = require('mongoose');
const { Schema } = mongoose;

const docSchema = new Schema({
  name: String, // String is shorthand for {type: String}
  url: String,
  content: String,
  extension: String,
});

docSchema.index({ name: 'text', content: 'text' }, { name: 'search' });

module.exports = mongoose.model('doc', docSchema);