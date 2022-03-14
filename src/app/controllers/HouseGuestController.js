import * as Yup from "yup";
import { Op } from "sequelize";

import HouseGuest from "../models/HouseGuest";

class HouseGuestController {
  async index(req, res) {
    const houseGuests = await HouseGuest.findAll();

    return res.json(houseGuests.map((houseGuest) => houseGuest));
  }

  async show(req, res) {
    const houseGuest = await HouseGuest.findOne(req.id);

    return res.json(houseGuest);
  }

  async save(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      last_name: Yup.string().required(),
      age: Yup.number().min(18),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    const houseGuest = await HouseGuest.create(req.body);

    return res.json(houseGuest);
  }
}

export default new HouseGuestController();
