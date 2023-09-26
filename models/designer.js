const mongoose = require('mongoose');

const { Schema } = mongoose;

const DesignerSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  last_name: { type: String, required: true, maxLength: 100 },
});

DesignerSchema.virtual('url').get(function () {
  return `/catalog/designer/${this._id}`;
});

module.exports = mongoose.model('Designer', DesignerSchema);
