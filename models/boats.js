const mongoose = require('mongoose');

const { Schema } = mongoose;

const BoatSchema = new Schema({
  model: { type: String maxLength: 100},
  manufacturer:{}
});
