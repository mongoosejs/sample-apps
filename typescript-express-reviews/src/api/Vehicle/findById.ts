import express, { Request, Response } from 'express';
import Vehicle from '../../models/vehicle';
import Review from '../../models/review';
import connect from '../../models/connect';

const last5 = async function (request: Request, response: Response) {
    await connect();
    const limit = request.body.limit ? request.body.limit : 5;
    const vehicle = await Vehicle.findById({ _id: request.body.vehicleId });
    const reviews = await Review.find({ vehicleId: request.body.vehicleId }).sort({ createdAt: -1 }).limit(limit);

    return response.status(200).json({ message: 'The last5 route was pinged', vehicle: vehicle, reviews: reviews });
};

export default last5;