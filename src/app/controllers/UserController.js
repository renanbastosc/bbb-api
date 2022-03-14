import * as Yup from "yup";

import User from "../models/User";
import { UserShower } from "../services/user";

class UserController {
  async index(req, res) {
    const users = await User.findAll();

    return res.json(users.map(({ id, name, email }) => ({ id, name, email })));
  }

  async show(req, res) {
    const user = await new UserShower(req.params.id, req.userId).show();

    return res.json(user);
  }

  async save(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(8),
    });

    await schema.validate(req.body); // raises error

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: "User already exists." });
    }

    const { id, name, email } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
