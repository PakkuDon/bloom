const Repository = require("../repository");

describe("Repository", () => {
  describe("#add", () => {
    it("increases number of records", () => {
      const repository = new Repository();

      expect(repository.size()).toEqual(0);
      repository.add({ _id: "a" });
      expect(repository.size()).toEqual(1);
    });
  });

  describe("#findById", () => {
    describe("when record exists", () => {
      it("returns record", () => {
        const id = 123;
        const record = {
          _id: id,
          data: "something",
        };

        const repository = new Repository();
        repository.add(record);

        expect(repository.findById(id)).toEqual(record);
      });
    });
  });
});
