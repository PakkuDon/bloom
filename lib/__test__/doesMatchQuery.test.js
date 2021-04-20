const doesMatchQuery = require("../doesMatchQuery");

describe("doesMatchQuery", () => {
  describe("when record contains query value as whole value", () => {
    it("returns true", () => {
      const record = { _id: 1 };
      const query = 1;

      expect(doesMatchQuery({ record, query })).toEqual(true);
    });
  });

  describe("when record does not contain query value", () => {
    it("returns false", () => {
      const record = { _id: 1 };
      const query = 2;

      expect(doesMatchQuery({ record, query })).toEqual(false);
    });
  });

  describe("when record contains query value as whole value in different type", () => {
    it("returns false", () => {
      const record = { _id: "1" };
      const query = 1;

      expect(doesMatchQuery({ record, query })).toEqual(false);
    });
  });

  describe("when record contains query value in substring", () => {
    it("returns false", () => {
      const record = { _id: 1, description: "Hello world" };
      const query = "Hello";

      expect(doesMatchQuery({ record, query })).toEqual(false);
    });
  });

  describe("when record contains query value but in different case", () => {
    it("returns false", () => {
      const record = { foo: "bar" };
      const query = "BAR";

      expect(doesMatchQuery({ record, query })).toEqual(false);
    });
  });

  describe("when record contains query value as element in subarray", () => {
    it("returns true", () => {
      const record = { _id: 1, tags: ["Hello", "world"] };
      const query = "Hello";

      expect(doesMatchQuery({ record, query })).toEqual(true);
    });
  });
});
