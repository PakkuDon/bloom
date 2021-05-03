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

  describe("#findUsers", () => {
    it("returns users that match provided query and associated records", () => {
      const store = new Store();
      store.loadData();

      expect(store.findUsers(["Cross Barlow"])).toEqual([
        expect.objectContaining({
          _id: 2,
          organisation: expect.objectContaining({ _id: 1 }),
          submittedTickets: expect.arrayContaining([
            expect.objectContaining(
              {
                _id: "1a227508-9f39-427c-8f57-1b72f3fab87c",
              },
              expect.objectContaining({
                _id: "2217c7dc-7371-4401-8738-0a8a8aedc08d",
              })
            ),
          ]),
          assignedTickets: expect.arrayContaining([
            expect.objectContaining({
              _id: "436bf9b0-1147-4c0a-8439-6f79833bff5b",
            }),
          ]),
        }),
      ]);
    });
  });

  describe("#findTickets", () => {
    it("returns tickets that match provided query and associated records", () => {
      const store = new Store();
      store.loadData();

      expect(store.findTickets(["pending"])).toEqual([
        expect.objectContaining({
          _id: "436bf9b0-1147-4c0a-8439-6f79833bff5b",
          assignee: expect.objectContaining({ _id: 2 }),
          submitter: expect.objectContaining({ _id: 1 }),
          organisation: expect.objectContaining({ _id: 1, name: "Something" }),
        }),
      ]);
    });
  });

  describe("#findOrganisations", () => {
    it("returns organisations that match provided query and associated records", () => {
      const store = new Store();
      store.loadData();

      expect(store.findOrganisations(["Something"])).toEqual([
        expect.objectContaining({
          _id: 1,
          users: expect.arrayContaining([
            expect.objectContaining({
              _id: 1,
              name: "Francisca Rasmussen",
            }),
            expect.objectContaining({
              _id: 2,
              name: "Cross Barlow",
            }),
          ]),
          tickets: expect.arrayContaining([
            expect.objectContaining({
              _id: "436bf9b0-1147-4c0a-8439-6f79833bff5b",
            }),
            expect.objectContaining({
              _id: "2217c7dc-7371-4401-8738-0a8a8aedc08d",
            }),
          ]),
        }),
      ]);
    });
  });

  describe("when passed multiple search terms", () => {
    it("returns records that match either search term", () => {
      const store = new Store();
      store.loadData();

      const query = [2, "Ingrid Wagner"];

      console.log(store.findUsers(query));

      expect(store.findUsers(query)).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            _id: 2,
          }),
          expect.objectContaining({
            _id: 3,
          }),
        ])
      );
    });
  });
});
