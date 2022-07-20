import express, { Request, Response } from 'express';
import Authentication from '../../models/authentication';
import User from '../../models/user';
import connect from '../../models/connect';
const bcrypt = require('bcryptjs');

const register = async function (request: Request, response: Response) {
    await connect();
    if (!request.body) return response.status(500).json({ error: 'No body was sent' });
    if (request.body.password.length < 6) return response.status(500).json({ error: 'password is too short' });

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
    response.status(200).json({ message: 'The register route was pinged and an account was created', user: user });
};

export default register;