const mongoose = require('mongoose');

const { Schema } = mongoose;

const BoatSchema = new Schema({
  model: { type: String maxLength: 100},
  manufacturer:[{ type: Schema.Types.ObjectId, ref: 'Manufacturer' }],
  designer: [{ type: Schema.Types.ObjectId, ref: 'Designer' }],
  type: [{ type: Schema.Types.ObjectId, ref: 'Type' }],
  displacement: { type: String maxLength: 20},
  LOA: { type: String maxLength: 20},
  LWL: { type: String maxLength: 20},
  Beam: { type: String maxLength: 20},
  balast: { type: String maxLength: 20},
});

// virtuals for Boat url
BoatSchema.virtual("url").get(function () {
    return `/catalog/boats/${this._id}`
})

module.exports = mongoose.model("Boat", BoatSchema)
