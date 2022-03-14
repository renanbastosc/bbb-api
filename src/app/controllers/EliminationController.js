import * as Yup from "yup";
import Sequelize from "sequelize";

import Elimination from "../models/Elimination";
import Vote from "../models/Vote";
import HouseGuest from "../models/HouseGuest";
import EliminationHouseGuest from "../models/EliminationHouseGuest";
import { EliminationCreator, EliminationLister } from "../services/elimination";

class EliminationController {
  async index(req, res) {
    const eliminations = await new EliminationLister().list();
    
    return res.json(eliminations);
  }

  async public_show(req, res) {
    const elimination = await Elimination.findOne({
      where: { current: true },
      include: [
        {
          model: EliminationHouseGuest,
          include: [
            {
              model: HouseGuest,
            },
          ],
        },
      ],
    });

    if (!elimination) {
      return res.status(400).json({ error: "Não tem paredao aberto" });
    }

    const { id, date, current, elimination_house_guests } = elimination;

    const house_guests = [];

    for (const elimination_house_guest of elimination_house_guests) {
      const house_guest = {
        id: elimination_house_guest.house_guest_id,
        name: elimination_house_guest.house_guest.name,
      };

      house_guests.push(house_guest);
    }

    return res.json({ id, date, current, house_guests });
  }

  async show(req, res) {
    const { id, date, current, elimination_house_guests } =
      await Elimination.findOne({
        where: { id: req.params.id },
        include: [
          {
            model: EliminationHouseGuest,
            include: [
              {
                model: HouseGuest,
              },
            ],
          },
        ],
      });

    let total_votes = 0;
    const house_guests = [];

    for (const elimination_house_guest of elimination_house_guests) {
      const votes = await Vote.count({
        include: [
          {
            model: EliminationHouseGuest,
            where: { id: elimination_house_guest.id },
          },
        ],
      });

      const house_guest = {
        id: elimination_house_guest.house_guest_id,
        name: elimination_house_guest.house_guest.name,
        votes: votes,
      };

      house_guests.push(house_guest);
      total_votes += votes;
    }

    return res.json({ id, date, current, total_votes, house_guests });
  }

  async save(req, res) {
    const { id, date } = await new EliminationCreator(req.body).create();

    return res.status(200).json({ id, date });
  }

  async close(req, res) {
    const elimination = await Elimination.findOne({
      where: { current: true },
    });

    if (!elimination) {
      return res.status(400).json({ error: "There is no open elimination" });
    }

    const {
      dataValues: { house_guest_id },
    } = await Vote.findOne({
      attributes: [
        [
          Sequelize.col("elimination_house_guest.house_guest_id"),
          "house_guest_id",
        ],
      ],
      include: [
        {
          model: EliminationHouseGuest,
          where: { elimination_id: elimination.id },
        },
      ],
      group: ["elimination_house_guest.id"],
      order: [Sequelize.literal("count(votes.id) DESC")],
    });

    if (!house_guest_id) {
      return res.status(400).json({ error: "Unable to count votes" });
    }

    elimination.current = false;
    await elimination.save();

    const houseGuest = await HouseGuest.findOne({
      where: { id: house_guest_id },
    });

    houseGuest.eliminated_at = new Date();
    await houseGuest.save();

    return res.status(200).json();
  }
}

export default new EliminationController();
