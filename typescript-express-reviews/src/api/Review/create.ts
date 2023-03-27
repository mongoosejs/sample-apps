import express, { Request, Response } from 'express';
import Review from '../../models/review';
import Vehicle from '../../models/vehicle';

async function create(request: Request, response: Response) {
  const review = await Review.create({
    text: request.body.text,
    rating: request.body.rating,
    userId: request.body.userId,
    vehicleId: request.body.vehicleId
  });

  const vehicle = await Vehicle.findById({ _id: request.body.vehicleId }).orFail();
  vehicle.numReviews += 1;
  const vehicleReviews = await Review.find({ vehicleId: request.body.vehicleId });
  const reviewRatings = vehicleReviews.map((entry) => entry.rating);
  const average = calculateAverage(reviewRatings);

  vehicle.averageReview = average;
  await vehicle.save();

  response.status(200).json({ vehicle: vehicle, review: review });
}

function calculateAverage(ratings: number[]) {
  let sum = 0;
  for (let i = 0; i < ratings.length; i++) {
    sum += ratings[i];
  }
  const average = sum / ratings.length;
  return average;
}

export default create;
