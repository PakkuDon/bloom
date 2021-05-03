const normalizeInput = require("../normalizeInput");

describe("normalizeInput", () => {
  describe("when given string", () => {
    it("returns string", () => {
      expect(normalizeInput("a")).toEqual(["a"]);
    });
  });

  describe("when given string with preceding or trailing whitespace", () => {
    it("returns trimmed string", () => {
      expect(normalizeInput("   a ")).toEqual(["a"]);
    });
  });

  describe("when given an empty string", () => {
    it("returns empty string", () => {
      expect(normalizeInput("")).toEqual([""]);
    });
  });

  describe("when given comma-separated list", () => {
    it("returns something", () => {
      expect(normalizeInput(",true,1")).toEqual(["", true, 1]);
    });
  });

  describe("when given a boolean value as a string", () => {
    it("converts string to a boolean value", () => {
      expect(normalizeInput("true")).toEqual([true]);
      expect(normalizeInput("false")).toEqual([false]);
    });
  });

  describe("when given a numeric value as a string", () => {
    it("converts string to a numeric value", () => {
      expect(normalizeInput("101")).toEqual([101]);
      expect(normalizeInput("1.5")).toEqual([1.5]);
    });
  });
});
