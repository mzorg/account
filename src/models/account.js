const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const accountSchema = new Schema({
  credit: {
    type: Number,
    default: 100
  },
  userId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Account', accountSchema);
