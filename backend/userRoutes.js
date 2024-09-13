import express from 'express';
import { ObjectId } from 'mongodb';
import { getDb } from './connect.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

let userRoutes = express.Router();
const SALT_ROUNDS = 6;

//#1 - Retrieve All
//http://localhost:3000/users
userRoutes.route('/users').get(async (request, response) => {
  let db = getDb();
  let data = await db.collection('users').find({}).toArray();
  if (data.length > 0) {
    response.json(data);
  } else {
    throw new Error('Data was not found :(');
  }
});

//#2 - Retrieve One
//http://localhost:3000/users/12345
userRoutes.route('/users/:id').get(async (request, response) => {
  let db = getDb();
  let data = await db
    .collection('users')
    .findOne({ _id: new ObjectId(request.params.id) });
  if (Object.keys(data).length > 0) {
    response.json(data);
  } else {
    throw new Error('Data was not found :(');
  }
});

//#3 - Create one
userRoutes.route('/users').post(async (request, response) => {
  let db = getDb();

  const takenEmail = await db
    .collection('users')
    .findOne({ email: request.body.email });

  if (takenEmail) {
    response.json({ message: 'Email is taken' });
  } else {
    const hash = await bcrypt.hash(request.body.password, SALT_ROUNDS);

    let mongoObject = {
      name: request.body.name,
      email: request.body.email,
      password: hash,
      joinDate: new Date(),
      cart: [],
    };
    let data = await db.collection('users').insertOne(mongoObject);
    response.json(data);
  }
});

//#4 - Update one
userRoutes.route('/users/:id').put(async (request, response) => {
  let db = getDb();
  let mongoObject = {
    $set: {
      name: request.body.name,
      email: request.body.email,
      password: request.body.password,
      joinDate: request.body.joinDate,
      cart: request.body.cart,
    },
  };
  let data = await db
    .collection('users')
    .updateOne({ _id: new ObjectId(request.params.id) }, mongoObject);
  response.json(data);
});

//#5 - Delete one
userRoutes.route('/users/:id').delete(async (request, response) => {
  let db = database.getDb();
  let data = await db
    .collection('users')
    .deleteOne({ _id: new ObjectId(request.params.id) });
  response.json(data);
});

//#3 - Login
userRoutes.route('/users/login').post(async (request, response) => {
  let db = getDb();

  const user = await db
    .collection('users')
    .findOne({ email: request.body.email });

  if (user) {
    let confirmation = await bcrypt.compare(
      request.body.password,
      user.password
    );
    if (confirmation) {
      const token = jwt.sign(user, process.env.SECRETKEY, { expiresIn: '1h' });
      response.json({ success: true, token });
    } else {
      response.json({ success: false, message: 'Incorrect password' });
    }
  } else {
    response.json({ success: false, message: 'User not found' });
  }
});

export default userRoutes;
