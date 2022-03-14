import NotAuthorizedError from "../../exceptions/NotAuthorizedError";
import User from "../../models/User";

class UserShower {
  constructor(userId, loggedUserId) {
    this.userId = userId;
    this.loggedUserId = loggedUserId;
  }

  async show() {
    if (Number(this.userId) !== Number(this.loggedUserId)) {
      const loggedUser = await User.findOne({
        where: { id: this.loggedUserId },
      });

      if (!loggedUser?.dataValues?.provider) {
        throw new NotAuthorizedError();
      }
    }

    const user = await User.findOne({
      where: { id: this.userId },
    });

    // console.log("user: ", user.dataValues.id);

    return { id: user.id, name: user.name, email: user.email };
  }
}

export default UserShower;
