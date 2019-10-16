require('dotenv').config();
const mongoose = require('mongoose');

const SpotSchema = new mongoose.Schema(
  {
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    }
  }
);

SpotSchema.virtual('thumbnail_url').get(function() {
  return `${process.env.URL || 'http://localhost'}:${process.env.PORT || 3333}/files/${this.thumbnail}`;
});

module.exports = mongoose.model('Spot', SpotSchema);
