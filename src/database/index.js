import { Sequelize } from "sequelize";

import Elimination from "../app/models/Elimination";
import HouseGuest from "../app/models/HouseGuest";
import EliminationHouseGuest from "../app/models/EliminationHouseGuest";
import User from "../app/models/User";
import Vote from "../app/models/Vote";

import databaseConfig from "../config/database";

const models = [User, HouseGuest, Elimination, EliminationHouseGuest, Vote];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
