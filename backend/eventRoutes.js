import express from 'express';
import { ObjectId } from 'mongodb';
import { getDb } from './connect.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

let eventRoutes = express.Router();

//#1 - Retrieve All
//http://localhost:3000/events
eventRoutes.route('/events').get(async (request, response) => {
  let db = getDb();
  let data = await db.collection('events').find({}).toArray();
  if (data.length > 0) {
    response.json(data);
  } else {
    throw new Error('Data was not found :(');
  }
});

//#2 - Retrieve One
//http://localhost:3000/events/12345
eventRoutes.route('/events/:id').get(async (request, response) => {
  let db = getDb();
  let data = await db
    .collection('events')
    .findOne({ _id: new ObjectId(request.params.id) });
  if (Object.keys(data).length > 0) {
    response.json(data);
  } else {
    throw new Error('Data was not found :(');
  }
});

//#3 - Create one
eventRoutes.route('/events').post(verifyToken, async (request, response) => {
  let db = getDb();
  let mongoObject = {
    name: request.body.name,
    date: request.body.date,
    imageId: request.body.imageId,
  };
  let data = await db.collection('events').insertOne(mongoObject);
  response.json(data);
});

//#4 - Update one
eventRoutes.route('/events/:id').put(verifyToken, async (request, response) => {
  let db = getDb();
  let mongoObject = {
    $set: {
      name: request.body.name,
      date: request.body.date,
      imageId: request.body.imageId,
    },
  };
  let data = await db
    .collection('events')
    .updateOne({ _id: new ObjectId(request.params.id) }, mongoObject);
  response.json(data);
});

//#5 - Delete one
eventRoutes
  .route('/events/:id')
  .delete(verifyToken, async (request, response) => {
    let db = database.getDb();
    let data = await db
      .collection('events')
      .deleteOne({ _id: new ObjectId(request.params.id) });
    response.json(data);
  });

function verifyToken(request, response, next) {
  const authHeaders = request.headers['authorization'];
  const token = authHeaders && authHeaders.split(' ')[1];
  if (!token) {
    return response
      .status(401)
      .json({ message: 'Authentication token is missing' });
  }

  jwt.verify(token, process.env.SECRETKEY, (error, user) => {
    if (error) {
      response.status(403).json({ message: 'Invalid Token' });
    }

    request.body.user = user;
    next();
  });
}

export default eventRoutes;
