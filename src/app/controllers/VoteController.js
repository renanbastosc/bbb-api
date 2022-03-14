import Vote from "../models/Vote";
import { VoteCreator } from "../services/vote";

class VoteController {
  async index(req, res) {
    const votes = await Vote.findAll();

    return res.json(votes.map(({ id, name, email }) => ({ id, name, email })));
  }

  async save(req, res) {
    const vote = await new VoteCreator(req.userId, req.body).create();

    return res.status(201).json({ ok: true });
  }
}

export default new VoteController();
