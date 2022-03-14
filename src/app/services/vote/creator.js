import * as Yup from "yup";

import ObjectNotFound from "../../exceptions/ObjectNotFound";
import Vote from "../../models/Vote";
import HouseGuest from "../../models/HouseGuest";
import Elimination from "../../models/Elimination";
import EliminationHouseGuest from "../../models/EliminationHouseGuest";

class VoteCreator {
  constructor(userId, body) {
    this.userId = userId;
    this.body = body;
  }

  async validateSchema() {
    const schema = Yup.object().shape({
      house_guest_id: Yup.number().required(),
    });

    await schema.validate(this.body);
  }

  async getElimination() {
    const elimination = await Elimination.findOne({
      where: { current: true },
      include: [EliminationHouseGuest],
    });

    if (!elimination) {
      throw new ObjectNotFound("Elimination");
    }

    return elimination;
  }

  async getEliminationHouseGuest(elimination, houseGuestId) {
    const eliminationHouseGuest = await EliminationHouseGuest.findOne({
      where: {
        elimination_id: elimination.id,
        house_guest_id: houseGuestId,
      },
      include: [
        {
          model: HouseGuest,
          where: { eliminated_at: null },
        },
      ],
    });

    if (!eliminationHouseGuest) {
      throw new ObjectNotFound("HouseGuest");
    }

    return eliminationHouseGuest;
  }

  async create() {
    await this.validateSchema();

    const elimination = await this.getElimination();

    const { house_guest_id } = this.body;

    const eliminationHouseGuest = await this.getEliminationHouseGuest(
      elimination,
      house_guest_id
    );

    const vote = await Vote.create({
      user_id: this.userId,
      elimination_house_guest_id: eliminationHouseGuest.id,
    });

    return vote;
  }
}

export default VoteCreator;
