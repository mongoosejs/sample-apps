
import {describe, it, before } from 'mocha';
import assert from 'assert';
import sinon from 'sinon';
import create from '../src/api/Review/create';
import Vehicle from '../src/models/vehicle';
import User from '../src/models/user';
import mongoose from 'mongoose';

describe('Review', function() {
  before(async () => {
    await mongoose.connect('mongodb://localhost:27017/vehicle-review');
    await mongoose.connection.dropDatabase();
  })
  it('should create a review', async function() {
    const mockRequest = (body) => ({
      body
    })
    const mockResponse = () => {
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      return res;
    };
    const user = await User.create({
      email: 'test@localhost.com',
      firstName: 'Test',
      lastName: 'Testerson'
    });
    const vehicle = await Vehicle.create(
      {
        make: 'Tesla',
        model: 'Model S',
        year: 2022,
        images: [
          'https://tesla-cdn.thron.com/delivery/public/image/tesla/6139697c-9d6a-4579-837e-a9fc5df4a773/bvlatuR/std/1200x628/Model-3-Homepage-Social-LHD',
          'https://www.tesla.com/sites/default/files/images/blogs/models_blog_post.jpg'
        ],
        numReviews: 0,
        averageReview: 0
      },
    );
    const req = mockRequest({ vehicleId: vehicle._id, userId: user._id, rating: 4, text: 'The length of this text must be greater than 30 to pass validation.'});
    const res = mockResponse();
    await create(req, res);
    console.log(res.json.getCall(0).args[0]);
    assert(res.json.getCall(0).args[0].message);
    assert(res.json.getCall(0).args[0].review);
    assert.equal(res.json.getCall(0).args[0].review.rating, 4);
    assert.equal(res.json.getCall(0).args[0].review.text, 'The length of this text must be greater than 30 to pass validation.');
  });
});