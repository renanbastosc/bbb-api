import Sequelize, { Model } from "sequelize";

class HouseGuest extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        last_name: Sequelize.STRING,
        age: Sequelize.INTEGER,
        occupation: Sequelize.STRING,
        avatar: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
        eliminated_at: Sequelize.DATE,
      },
      {
        sequelize,
        modelName: "house_guests",
      }
    );

    return this;
  }
}

export default HouseGuest;
