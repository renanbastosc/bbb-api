import request from "supertest";
import app from "../../../src/app";
import factory from "../../factories";

import truncate from "../../util/truncate";

describe("User.show", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("provider should able to show any user", async () => {
    const user = await factory.create("UserProvider");
    const sessionResponse = await request(app).post(`/sessions`).send({
      email: user.dataValues.email,
      password: user.dataValues.password,
    });
    const { token } = sessionResponse.body;

    const user2 = await factory.create("User");

    const response = await request(app)
      .get(`/users/${user2.dataValues.id}`)
      .set("Authorization", `bearer ${token}`)
      .send();

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("email");
  });

  it("common user should not able to show any user", async () => {
    const user = await factory.create("User");
    const sessionResponse = await request(app).post(`/sessions`).send({
      email: user.dataValues.email,
      password: user.dataValues.password,
    });
    const { token } = sessionResponse.body;

    const user2 = await factory.create("User");

    const response = await request(app)
      .get(`/users/${user2.dataValues.id}`)
      .set("Authorization", `bearer ${token}`)
      .send();

    expect(response.status).toEqual(403);
  });

  it("common user should able to show itself", async () => {
    const user = await factory.create("User", {
      provider: false
    });

    const sessionResponse = await request(app).post(`/sessions`).send({
      email: user.dataValues.email,
      password: user.dataValues.password,
    });

    const { token } = sessionResponse.body;

    const response = await request(app)
      .get(`/users/${user.dataValues.id}`)
      .set("Authorization", `bearer ${token}`)
      .send();

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("email");
  });

  it("should return error without token", async () => {
    const user = await factory.create("User");

    const response = await request(app)
      .get(`/users/${user.dataValues.id}`)
      .send();

    expect(response.status).toEqual(401);
  });
});
