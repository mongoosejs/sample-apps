import express, { Request, Response } from 'express';
import Review from '../../models/review';

async function findByVehicle (request: Request, response: Response) {
  const limit = request.body.limit != null ? request.body.limit : 5;
  const skip = request.body.skip != null ? request.body.skip : 0;
  const reviews = await Review.find({ vehicleId: request.body.vehicleId }).sort({ createdAt: -1 }).skip(skip).limit(limit);
  return response.status(200).json({ reviews: reviews });
};

export default findByVehicle;