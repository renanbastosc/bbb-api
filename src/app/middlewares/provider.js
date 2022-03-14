import jwt from "jsonwebtoken";
import { promisify } from "util";

import auth from "../../config/auth";
import User from "../models/User";

export default async (req, res, next) => {
  try {
    const id = req.userId;

    const user = await User.findOne({ where: { id } });

    if (!user.provider) {
      return res.status(403).json({
        error: "Unauthorized",
      });
    }

    return next();
  } catch (ex) {
    return res.status(401).json({
      error: "Invalid token",
      exception: ex,
    });
  }
};
