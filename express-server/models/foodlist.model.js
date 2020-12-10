const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// List of foods, owned by a user
const schema = new Schema({
  ownerUsername: { type: String, unique: true, required: true },
  foods: {type: [String], required: true }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('foodlists', schema);
