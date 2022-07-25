import express, { Request, Response } from 'express';
import Vehicle from '../../models/vehicle';
import Review from '../../models/review';

async function last5 (request: Request, response: Response) {
  const limit = request.body.limit != null ? request.body.limit : 5;
  const vehicle = await Vehicle.findById({ _id: request.body.vehicleId });
  const reviews = await Review.find({ vehicleId: request.body.vehicleId }).sort({ createdAt: -1 }).limit(limit);

  return response.status(200).json({ vehicle: vehicle, reviews: reviews });
};

export default last5;