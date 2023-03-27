import mongoose from './mongoose';

const schema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
    validate: (v: number) => Number.isInteger(v)
  },
  text: {
    type: String,
    required: true,
    validate: (v: string) => v.length >= 30
  },
  userId: {
    type: 'ObjectId',
    required: true
  },
  vehicleId: {
    type: 'ObjectId',
    required: true
  }
}, { timestamps: true });

schema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true
});

schema.virtual('vehicle', {
  ref: 'Vehicle',
  localField: 'vehicleId',
  foreignField: '_id',
  justOne: true
});

const Review = mongoose.model('Review', schema);

export default Review;
