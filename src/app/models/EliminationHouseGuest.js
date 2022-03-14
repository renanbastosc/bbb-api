import Sequelize, { Model } from "sequelize";

class EliminationHouseGuest extends Model {
  static init(sequelize) {
    super.init(
      {
        elimination_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "eliminations",
            key: "id",
          },
        },
        house_guest_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "house_guests",
            key: "id",
          },
        },
      },
      {
        sequelize,
        modelName: "elimination_house_guests",
        timestamps: false
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.eliminations, { foreignKey: "elimination_id" });
    this.belongsTo(models.house_guests, { foreignKey: "house_guest_id" });
  }
}

export default EliminationHouseGuest;
