import faker from "@faker-js/faker";
import { factory } from "factory-girl";

import User from "../src/app/models/User";

factory.define("User", User, {
  name: () => faker.name.firstName(),
  email: () => faker.internet.email(),
  password: () => faker.internet.password(),
});

factory.define("UserProvider", User, {
  name: () => faker.name.firstName(),
  email: () => faker.internet.email(),
  password: () => faker.internet.password(),
  provider: () => true
});


export default factory;