import express, { Request, Response } from 'express';
import Authentication from '../../models/authentication';
import User from '../../models/user';
import bcrypt from 'bcryptjs';

async function register(request: Request, response: Response) {
  if (!request.body) return response.status(500).json({ error: 'No body was sent' });
  // for brian
  if (request.body.password.length < 5) return response.status(500).json({ error: 'password is too short' });

  const user = await User.create({
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email
  });

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(request.body.password, salt);
  await Authentication.create({
    type: 'password',
    userId: user._id,
    secret: hash
  });
  response.status(200).json({ user: user });
}

export default register;
