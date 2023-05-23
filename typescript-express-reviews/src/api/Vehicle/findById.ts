import express, { Request, Response } from 'express';
import Vehicle from '../../models/vehicle';
import Review from '../../models/review';

async function last5(request: Request, response: Response): Promise<void> {
  let limit = 5;
  if (request.query?.limit != null) {
    limit = parseInt(request.query.limit.toString(), 10);
  }

  const vehicle = await Vehicle.
    findById({ _id: request.query?._id }).
    setOptions({ sanitizeFilter: true });
  const reviews = await Review.
    find({ vehicleId: request.query._id }).
    sort({ createdAt: -1 }).
    limit(limit).
    populate('user').
    populate('vehicle').
    setOptions({ sanitizeFilter: true });

  response.status(200).json({
    vehicle: vehicle,
    reviews: reviews
  });
}

export default last5;
