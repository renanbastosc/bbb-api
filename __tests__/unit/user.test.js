import bcrypt from "bcryptjs/dist/bcrypt";
import User from "../../src/app/models/User";
import factory from "../factories";

import truncate from "../util/truncate";

describe("User", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should encrypt user password", async () => {
    const factoryUser = await factory.attrs("User");
    const user = await User.create(factoryUser);

    const hash = await bcrypt.compare(factoryUser.password, user.password_hash);

    expect(hash).toBe(true);
  });

  it("shoud check password", async () => {
    const factoryUser = await factory.attrs("User");
    const user = await User.create(factoryUser);

    const result = await user.checkPassword(factoryUser.password, user.password_hash);

    expect(result).toBe(true);
  });
});
