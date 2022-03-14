import Sequelize, { Model } from "sequelize";

class Vote extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "users",
            key: "id",
          },
        },
        elimination_house_guest_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "elimination_house_guests",
            key: "id",
          },
        },
      },
      {
        sequelize,
        modelName: "votes",
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.users, { foreignKey: "user_id" });
    this.belongsTo(models.elimination_house_guests, {
      foreignKey: "elimination_house_guest_id",
    });
  }
}
export default Vote;
