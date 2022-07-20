import express, { Request, Response } from 'express';
import Authentication from '../../models/authentication';
import User from '../../models/user';
import connect from '../../models/connect';
const bcrypt = require('bcryptjs');

const login = async function (request: Request, response: Response) {
    console.log('This is the login route');
    await connect();
    const user = await User.findOne({ email: request.body.email}).setOptions({ sanitizeFilter: true, strict: 'throw' });
    if (user == null) {
        return response.status(404).send({ error: 'user not found' });
    }
    let status = 'no account'
    if (request.body.password != null) {
        const authenticate = await Authentication.findOne({ type: 'password', userId: user._id });
        if (authenticate == null) {
            return response.status(404).send({ error: 'This account does not have a password set' });
        }
        const matches = await bcrypt.compare(request.body.password, authenticate.secret);
        if (!matches) {
            return response.status(500).send({ error: 'Login Failed' });
        }
        status = 'account found';
    }


    return response.status(200).json({ message: 'The login route was pinged', status: status, user: user ? user : 'no user' });
};

export default login;