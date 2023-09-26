const mongoose = require('mongoose');

const { Schema } = mongoose;

const TypeSchema = new Schema({
  type: { type: String, maxLength: 100 },
});

ManufacturerSchema.virtual('url').get(function () {
  return `/catalog/type/${this._id}`;
});

module.exports = mongoose.model('Type', TypeSchema);
