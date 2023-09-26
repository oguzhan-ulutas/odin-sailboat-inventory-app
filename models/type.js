const mongoose = require('mongoose');

const { Schema } = mongoose;

const TypeSchema = new Schema({
  name: { type: String, maxLength: 100 },
});

TypeSchema.virtual('url').get(function () {
  return `/catalog/type/${this._id}`;
});

module.exports = mongoose.model('Type', TypeSchema);
