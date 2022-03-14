import Sequelize, { Model } from "sequelize";

class Elimination extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        current: Sequelize.BOOLEAN
      },
      {
        sequelize,
        modelName: "eliminations",
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.elimination_house_guests, {foreignKey: 'elimination_id'});
  }
}

export default Elimination;
