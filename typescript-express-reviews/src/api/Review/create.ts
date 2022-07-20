import express, { Request, Response } from 'express';
import Review from '../../models/review';
import Vehicle from '../../models/vehicle';
import connect from '../../models/connect';

const create = async function (request: Request, response: Response) {
    console.log('This is the create review route');
    await connect();
    const review = await Review.create({
        text: request.body.text,
        rating: request.body.rating,
        userId: request.body.userId,
        vehicleId: request.body.vehicleId
    });

    const vehicle = await Vehicle.findById({ _id: request.body.vehicleId });
    vehicle.numReviews += 1;
    let sum = 0;
    const vehicleReviews = await Review.find({ vehicleId: request.body.vehicleId });
    const reviewRatings = vehicleReviews.map((entry) => entry.rating);
    const average = calculateAverage(reviewRatings);

    vehicle.averageReview = average;
    await vehicle.save();

    response.status(200).json({ message: 'The create review route was pinged', vehicle: vehicle, review: review });
};

function calculateAverage(ratings) {
    let sum = 0;
    for (let i = 0; i < ratings.length; i++) {
        sum += ratings[i];
    }
    let average = sum / ratings.length;
    return average;
}

export default create;