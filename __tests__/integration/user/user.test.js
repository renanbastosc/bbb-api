import request from "supertest";
import app from "../../../src/app";
import factory from "../../factories";

import truncate from "../../util/truncate";

describe("User", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should be able to register", async () => {
    const user = await factory.attrs("User");

    const response = await request(app).post("/users").send(user);

    expect(response.body).toHaveProperty("id");
  });

  it("should return erro with invalid fields", async () => {
    const user = await factory.attrs("User", {
      password: "123",
    });

    const response = await request(app).post("/users").send(user);

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0]).toEqual(
      "password must be at least 8 characters"
    );
  });

  it("should not able to register with duplicated email", async () => {
    const user = await factory.attrs("User");

    const user1 = await request(app).post("/users").send(user);
    const user2 = await request(app).post("/users").send(user);

    expect(user2.status).toEqual(400);
    expect(user2.body).toHaveProperty("error");
    expect(user2.body.error).toEqual("User already exists.");
  });

  it("should able to list many users", async () => {    
    const user = await factory.create("UserProvider");
    const sessionResponse = await request(app).post(`/sessions`).send({
      email: user.dataValues.email,
      password: user.dataValues.password,
    });
    const { token } = sessionResponse.body;
    

    await factory.createMany("UserProvider", 2);

    const response = await request(app)
      .get("/users")
      .set("Authorization", `bearer ${token}`)
      .send();

    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(3);

    const firstUser = response.body[0];
    expect(firstUser).toHaveProperty("email");
  });
});
