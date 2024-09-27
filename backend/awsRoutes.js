import express from 'express';
import { ObjectId } from 'mongodb';
import { getDb } from './connect.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';

let awsRoutes = express.Router();
const s3Bucket = 'thestitchstand';

const s3Client = new S3Client({
  region: 'us-west-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

//#1 - Retrieve One
//http://localhost:3000/events/12345
awsRoutes.route('/images/:id').get(async (request, response) => {
  const id = request.params.id;
  const bucketParams = {
    Bucket: s3Bucket,
    Key: id,
  };

  const data = await s3Client.send(new GetObjectCommand(bucketParams));

  const contentType = data.ContentType;
  const srcString = await data.body.transformToString('base64');
  const imageSource = `data:${contentType};base64, ${srcString}`;

  response.json(imageSource);
});

//#2 - Create one
awsRoutes.route('/images').post(verifyToken, async (request, response) => {
  console.log(request.files);
  if (request.files && request.files.length > 0) {
    const file = request.files[0];
    console.log(file);
  } else {
    console.log('No files uploaded or files object is undefined');
    return response.status(400).send('No files were uploaded.');
  }
  const bucketParams = {
    Bucket: s3Bucket,
    Key: file.originalname,
    Body: file.buffer,
  };

  const data = await s3Client.send(new PutObjectCommand(bucketParams));
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

export default awsRoutes;
