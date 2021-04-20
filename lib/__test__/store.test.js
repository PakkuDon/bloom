const Store = require("../store");
const config = require("../../config");

const originalConfig = { ...config };

describe("Store", () => {
  beforeAll(() => {
    config.usersFile = "./lib/__test__/data/test_users.json";
    config.ticketsFile = "./lib/__test__/data/test_tickets.json";
    config.organisationsFile = "./lib/__test__/data/test_organisations.json";
  });

  afterAll(() => {
    config.usersFile = originalConfig.usersFile;
    config.ticketsFile = originalConfig.ticketsFile;
    config.organisationsFile = originalConfig.organisationsFile;
  });

  describe("#loadData", () => {
    it("loads records from source data", () => {
      const store = new Store();
      store.loadData();

      expect(store.tickets.size()).toEqual(3);
      expect(store.users.size()).toEqual(4);
      expect(store.organisations.size()).toEqual(2);
    });
  });
});
