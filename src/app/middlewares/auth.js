import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import auth from "../../config/auth";

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json( { error: 'Token not provided' } );
  }

  const [, token] = authHeader.split(' ');

  try {
    await promisify(jwt.verify)(token, auth.secret);
    return next();
  }
  catch (ex) {
    return res.status(401).json({
      error: 'Invalid token',
      exception: ex
    });
  }
};
