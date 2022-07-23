import express, { Request, Response } from 'express';
import Authentication from '../../models/authentication';
import User from '../../models/user';
import bcrypt from 'bcryptjs';

async function login(request: Request, response: Response) {
  const user = await User
    .findOne({ email: request.body.email })
    .setOptions({ sanitizeFilter: true });
  if (user == null) {
    return response.status(404).json({ error: 'user not found' });
  }
  if (request.body.password == null) {
    return response.status(400).json({ error: 'no password specified' });
  }

  const authentication = await Authentication.findOne({
    type: 'password',
    userId: user._id
  });
  if (authentication == null) {
    return response.status(404).json({
      error: 'This account does not have a password set'
    });
  }
  const matches = await bcrypt.compare(
    request.body.password,
    authentication.secret
  );
  if (!matches) {
    return response.status(500).json({ error: 'Login Failed' });
  }

  return response.status(200).json({ user: user });
}

export default login;
