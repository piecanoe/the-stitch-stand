import express from 'express';
import { ObjectId } from 'mongodb';
import { getDb } from './connect.js';

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
eventRoutes.route('/events').post(async (request, response) => {
  let db = getDb();
  let mongoObject = {
    name: request.body.name,
    date: request.body.date,
  };
  let data = await db.collection('events').insertOne(mongoObject);
  response.json(data);
});

//#4 - Update one
eventRoutes.route('/events/:id').put(async (request, response) => {
  let db = getDb();
  let mongoObject = {
    $set: {
      name: request.body.name,
      date: request.body.date,
    },
  };
  let data = await db
    .collection('events')
    .updateOne({ _id: new ObjectId(request.params.id) }, mongoObject);
  response.json(data);
});

//#5 - Delete one
eventRoutes.route('/events/:id').delete(async (request, response) => {
  let db = database.getDb();
  let data = await db
    .collection('events')
    .deleteOne({ _id: new ObjectId(request.params.id) });
  response.json(data);
});

export default eventRoutes;
