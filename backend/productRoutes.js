import express from 'express';
import { ObjectId } from 'mongodb';
import { getDb } from './connect.js';

let productRoutes = express.Router();

//#1 - Retrieve All
//http://localhost:3000/products
productRoutes.route('/products').get(async (request, response) => {
  let db = getDb();
  let data = await db.collection('products').find({}).toArray();
  if (data.length > 0) {
    response.json(data);
  } else {
    throw new Error('Data was not found :(');
  }
});

//#2 - Retrieve One
//http://localhost:3000/products/12345
productRoutes.route('/products/:id').get(async (request, response) => {
  let db = getDb();
  let data = await db
    .collection('products')
    .findOne({ _id: new ObjectId(request.params.id) });
  if (Object.keys(data).length > 0) {
    response.json(data);
  } else {
    throw new Error('Data was not found :(');
  }
});

//#3 - Create one
productRoutes.route('/products').post(async (request, response) => {
  let db = getDb();
  let mongoObject = {
    name: request.body.name,
    category: request.body.category,
    price: request.body.price,
  };
  let data = await db.collection('products').insertOne(mongoObject);
  response.json(data);
});

//#4 - Update one
productRoutes.route('/products/:id').put(async (request, response) => {
  let db = getDb();
  let mongoObject = {
    $set: {
      name: request.body.name,
      category: request.body.category,
      price: request.body.price,
    },
  };
  let data = await db
    .collection('products')
    .updateOne({ _id: new ObjectId(request.params.id) }, mongoObject);
  response.json(data);
});

//#5 - Delete one
productRoutes.route('/products/:id').delete(async (request, response) => {
  let db = database.getDb();
  let data = await db
    .collection('products')
    .deleteOne({ _id: new ObjectId(request.params.id) });
  response.json(data);
});

export default productRoutes;
