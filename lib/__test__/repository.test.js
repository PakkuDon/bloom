const Repository = require("../repository");

describe("Repository", () => {
  describe("#add", () => {
    it("increases number of records", () => {
      const repository = new Repository();

      expect(repository.size()).toEqual(0);
      repository.add({ _id: "a" });
      expect(repository.size()).toEqual(1);
    });

    describe("when adding record with same key as existing record", () => {
      it("throws an error", () => {
        const recordId = "abc123";
        const repository = new Repository();

        repository.add({ _id: recordId });

        expect(() => {
          repository.add({ _id: recordId });
        }).toThrowError(/abc123 already exists/);
      });
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

    describe("when record does not exist", () => {
      it("returns undefined", () => {
        const repository = new Repository();

        expect(repository.findById("id")).toEqual(undefined);
      });
    });
  });
});
