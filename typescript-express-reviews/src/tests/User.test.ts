
import {describe, it, beforeEach } from 'mocha';
import register from '../api/user/register';
import login from '../api/user/login';
import express, { Request } from 'express';
import mongoose from 'mongoose';
import assert from 'assert';

describe('User', function() {
  it('should register a user', async function(done) {
    const request = { body: { firstName: 'Test', lastName: 'Testerson', email: 'test@localhost.com', password: 'password' } };
    const result = await register(request as Request, express.response, () => {});
    done();
    assert.ok(result);
    // done();
  });
  it('should login a user', async function() {

  });
});
