const mongoose = require('mongoose');

const { Schema } = mongoose;

const ManufacturerSchema = new Schema({
  name: { type: String, maxLength: 100 },
  country: { type: String, maxLength: 100 },
  city: { type: String, maxLength: 100 },
});

ManufacturerSchema.virtual('url').get(function () {
  return `/catalog/manufacturer/${this._id}`;
});

module.exports = mongoose.model('Manufucturer', ManufacturerSchema);
