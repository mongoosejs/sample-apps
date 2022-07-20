
import {describe, it, before } from 'mocha';
import mongoose from 'mongoose';
import register from '../src/api/user/register';
import login from '../src/api/user/login';
import assert from 'assert';
import sinon from 'sinon';

describe('User', function() {
  before(async () => {
    await mongoose.connect('mongodb://localhost:27017/vehicle-review');
    await mongoose.connection.dropDatabase();
  });
  it('should register a user', async function() {
    const mockRequest = (body) => ({
      body
    })
    const mockResponse = () => {
      // I don't know why status and json are mad, but mad because bad.
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      return res;
    };
    const req = mockRequest({ firstName: 'Test', lastName: 'Testerson', email: 'test@localhost.com', password: 'password' });
    const res = mockResponse();
    await register(req, res);
    assert(res.status.calledWith(200));
    assert(res.json.getCall(0).args[0].message);
    assert.equal(res.json.getCall(0).args[0].user.email, 'test@localhost.com');
    assert.equal(res.json.getCall(0).args[0].user.firstName, 'Test');
    assert.equal(res.json.getCall(0).args[0].user.lastName, 'Testerson');
  });
  it('should login a user', async function() {
    const mockRequest = (body) => ({
      body
    })
    const mockResponse = () => {
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      return res;
    };
    const req = mockRequest({ email: 'test@localhost.com', password: 'password'});
    const res = mockResponse();
    await login(req, res);
    assert(res.status.calledWith(200));
    assert(res.json.getCall(0).args[0].message);
    assert.equal(res.json.getCall(0).args[0].user.email, 'test@localhost.com')
    assert.equal(res.json.getCall(0).args[0].status, 'account found')
  });
});
