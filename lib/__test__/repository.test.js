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

    describe("when adding record that does not have _id field", () => {
      it("throws an error", () => {
        const repository = new Repository();

        expect(() => {
          repository.add({});
        }).toThrowError(/Record must have an _id/);
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

  describe("#where", () => {
    it("returns records that pass provided predicate", () => {
      const repository = new Repository();

      repository.add({ _id: "a", value: 1234 });
      repository.add({ _id: "b", value: 1234 });
      repository.add({ _id: "c", value: 4 });

      expect(repository.where((record) => record.value === 1234)).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ _id: "a" }),
          expect.objectContaining({ _id: "b" }),
        ])
      );
    });

    describe("when there are no records that pass provided predicate", () => {
      it("returns empty array", () => {
        const repository = new Repository();

        expect(repository.where((record) => record.value === 1)).toEqual([]);
      });
    });
  });
});
