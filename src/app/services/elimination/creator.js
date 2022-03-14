import * as Yup from "yup";

import Elimination from "../../models/Elimination";
import EliminationHouseGuest from "../../models/EliminationHouseGuest";

class EliminationCreator {
  constructor(body) {
    this.body = body;
  }

  async validateSchema() {
    const schema = Yup.object().shape({
      date: Yup.date().required(),
      current: Yup.boolean().required(),
      house_guests_ids: Yup.array().of(Yup.number()).min(2),
    });

    await schema.validate(this.body);
  }

  async disableOthersElimination() {
    const others = await Elimination.findAll({ where: { current: true } });

    for (const other of others) {
      other.current = false;
      await other.save();
    }
  }

  async create() {
    await this.validateSchema();

    const { date, current, house_guests_ids } = this.body;

    if (current) {
      this.disableOthersElimination();
    }

    const elimination = await Elimination.create({ date, current });

    for (const house_guests_id of house_guests_ids) {
      await EliminationHouseGuest.create({
        elimination_id: elimination.id,
        house_guest_id: house_guests_id,
      });
    }

    return elimination;
  }
}

export default EliminationCreator;
