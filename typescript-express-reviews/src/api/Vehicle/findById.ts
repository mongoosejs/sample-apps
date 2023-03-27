import express, { Request, Response } from 'express';
import Vehicle from '../../models/vehicle';
import Review from '../../models/review';

async function last5(request: Request, response: Response) {
  let limit = 5;
  if (request.query && request.query.limit) {
    limit = parseInt(request.query.limit as string, 10);
  }

  const vehicle = await Vehicle.
    findById({ _id: request.query._id }).
    setOptions({ sanitizeFilter: true });
  const reviews = await Review.
    find({ vehicleId: request.query._id }).
    sort({ createdAt: -1 }).
    limit(limit).
    setOptions({ sanitizeFilter: true });

  return response.status(200).json({
    vehicle: vehicle,
    reviews: reviews
  });
}

export default last5;
