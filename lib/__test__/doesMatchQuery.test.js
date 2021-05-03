const doesMatchQuery = require("../doesMatchQuery");

describe("doesMatchQuery", () => {
  describe("when record contains query value as whole value", () => {
    it("returns true", () => {
      const record = { _id: 1 };
      const query = [1];

      expect(doesMatchQuery({ record, query })).toEqual(true);
    });
  });

  describe("when query value is an empty string", () => {
    describe("and record contains value that is an empty string", () => {
      it("returns true", () => {
        const record = { data: "" };
        const query = [""];

        expect(doesMatchQuery({ record, query })).toEqual(true);
      });
    });

    describe("and record does not contain value with empty string", () => {
      it("returns false", () => {
        const record = { data: "    " };
        const query = [""];

        expect(doesMatchQuery({ record, query })).toEqual(false);
      });
    });
  });

  describe("when record does not contain query value", () => {
    it("returns false", () => {
      const record = { _id: 1 };
      const query = [2];

      expect(doesMatchQuery({ record, query })).toEqual(false);
    });
  });

  describe("when record contains query value as whole value in different type", () => {
    it("returns false", () => {
      const record = { _id: "1" };
      const query = [1];

      expect(doesMatchQuery({ record, query })).toEqual(false);
    });
  });

  describe("when record contains query value in substring", () => {
    it("returns false", () => {
      const record = { _id: 1, description: "Hello world" };
      const query = ["Hello"];

      expect(doesMatchQuery({ record, query })).toEqual(false);
    });
  });

  describe("when record contains query value but in different case", () => {
    it("returns false", () => {
      const record = { foo: "bar" };
      const query = ["BAR"];

      expect(doesMatchQuery({ record, query })).toEqual(false);
    });
  });

  describe("when record contains query value as element in subarray", () => {
    it("returns true", () => {
      const record = { _id: 1, tags: ["Hello", "world"] };
      const query = ["Hello"];

      expect(doesMatchQuery({ record, query })).toEqual(true);
    });
  });

  describe("when query contains multiple search terms", () => {
    it("returns true", () => {
      const record = { _id: 1, tags: ["Hello", "world"] };
      const anotherRecord = { _id: 2, description: "foobar" };
      const query = ["foobar", "Hello"];

      expect(doesMatchQuery({ record, query })).toEqual(true);
      expect(doesMatchQuery({ record: anotherRecord, query }));
    });
  });
});
