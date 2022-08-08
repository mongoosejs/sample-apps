import mongoose from './mongoose';

const schema = new mongoose.Schema({
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true,
    validate: v => v >= 1950
  },
  images: {
    type: [String]
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0
  },
  averageReview: {
    type: Number,
    required: true,
    default: 0
  }
});

const Vehicle = mongoose.model('Vehicle', schema);

export default Vehicle;
