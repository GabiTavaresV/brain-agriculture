import { NextFunction, Request, Response } from 'express';

import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const secretKey = process.env.SECRET_KEY || '';

export const authenticateToken = (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return response.status(401).json({ message: 'Token is missing or invalid' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return response.status(403).json({ message: 'Token is invalid or expired' });
    }

    (request as any).user = user;

    next();
  });
};
